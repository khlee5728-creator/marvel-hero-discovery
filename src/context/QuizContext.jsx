import { createContext, useCallback, useMemo, useRef, useState } from "react"
import fallbackQuestions from "../data/fallbackQuestions"
import { createQuestions } from "../services/mbtiService"
import {
  buildQuestionsSignature,
  generateLocalQuestions,
  shuffleQuestions,
} from "../utils/questions"

export const QuizContext = createContext(null)

const MAX_HISTORY = 64

function buildQuestionKey(question) {
  const prompt = question?.prompt || ""
  const options = (question?.options || [])
    .map((option) => `${option?.text || ""}:${option?.trait || ""}`)
    .join("|")
  return `${prompt}::${options}`
}

function countOverlap(nextQuestions, previousKeys) {
  if (!Array.isArray(nextQuestions) || !Array.isArray(previousKeys)) return 0
  const nextKeys = nextQuestions.map(buildQuestionKey)
  const previousSet = new Set(previousKeys)
  return nextKeys.filter((key) => previousSet.has(key)).length
}

function loadHistory() {
  try {
    const raw = localStorage.getItem("questionHistory") || "[]"
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveHistory(history, newKeys) {
  const combined = [...newKeys, ...history]
  const unique = [...new Set(combined)].slice(0, MAX_HISTORY)
  localStorage.setItem("questionHistory", JSON.stringify(unique))
}

async function fetchNewQuestions() {
  const history = loadHistory()
  const avoidList = history.slice(0, MAX_HISTORY)

  let normalized = []

  const requestId = crypto.randomUUID()
  normalized = await createQuestions({ requestId, avoidList })

  if (!normalized.length) {
    const retryId = crypto.randomUUID()
    normalized = await createQuestions({ requestId: retryId, avoidList })
  }

  if (!normalized.length || countOverlap(normalized, history) > 0) {
    normalized = generateLocalQuestions()
    if (countOverlap(normalized, history) > 0 && history.length > 32) {
      const trimmedHistory = history.slice(0, 32)
      localStorage.setItem("questionHistory", JSON.stringify(trimmedHistory))
    }
  }

  const signature = buildQuestionsSignature(normalized)
  const newKeys = normalized.map(buildQuestionKey)
  saveHistory(history, newKeys)
  localStorage.setItem("lastQuestionSignature", signature)

  return normalized
}

export function QuizProvider({ children }) {
  const [status, setStatus] = useState("idle")
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState(null)
  const prefetchRef = useRef(null)

  const prefetchQuestions = useCallback(() => {
    if (prefetchRef.current) return
    prefetchRef.current = fetchNewQuestions().catch(() => null)
  }, [])

  const startMission = useCallback(async () => {
    setStatus("loading")
    setError(null)
    setAnswers([])
    setCurrentIndex(0)
    localStorage.removeItem("quizAnswers")

    try {
      let normalized = null

      if (prefetchRef.current) {
        normalized = await prefetchRef.current
        prefetchRef.current = null
      }

      if (!normalized || !normalized.length) {
        normalized = await fetchNewQuestions()
      }

      setQuestions(normalized)
      setStatus("ready")
    } catch (err) {
      setError(err)
      const generated = generateLocalQuestions()
      const newKeys = generated.map(buildQuestionKey)
      const history = loadHistory()
      saveHistory(history, newKeys)
      localStorage.setItem(
        "lastQuestionSignature",
        buildQuestionsSignature(generated)
      )
      setQuestions(generated)
      setStatus("ready")
    }
  }, [])

  const selectAnswer = useCallback((answer) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = answer
      try {
        localStorage.setItem("quizAnswers", JSON.stringify(next))
      } catch {
        // ignore storage errors
      }
      return next
    })
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
  }, [currentIndex, questions.length])

  const resetMission = useCallback(() => {
    setStatus("idle")
    setQuestions([])
    setAnswers([])
    setCurrentIndex(0)
    setError(null)
    localStorage.removeItem("quizAnswers")
  }, [])

  const value = useMemo(
    () => ({
      status,
      questions,
      answers,
      currentIndex,
      error,
      startMission,
      selectAnswer,
      resetMission,
      prefetchQuestions,
    }),
    [status, questions, answers, currentIndex, error, startMission, selectAnswer, resetMission, prefetchQuestions]
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
