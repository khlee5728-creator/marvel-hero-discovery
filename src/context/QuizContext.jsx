import { createContext, useCallback, useMemo, useState } from "react"
import fallbackQuestions from "../data/fallbackQuestions"
import { createQuestions } from "../services/mbtiService"
import {
  buildQuestionsSignature,
  generateLocalQuestions,
  shuffleQuestions,
} from "../utils/questions"

export const QuizContext = createContext(null)

export function QuizProvider({ children }) {
  const [status, setStatus] = useState("idle")
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState(null)

  const startMission = useCallback(async () => {
    setStatus("loading")
    setError(null)
    setAnswers([])
    setCurrentIndex(0)

    try {
      const lastSignature = localStorage.getItem("lastQuestionSignature") || ""
      const lastQuestionsRaw = localStorage.getItem("lastQuestions") || "[]"
      let lastQuestions = []
      try {
        lastQuestions = JSON.parse(lastQuestionsRaw)
      } catch {
        lastQuestions = []
      }
      const avoidList = Array.isArray(lastQuestions)
        ? lastQuestions.slice(0, 8)
        : []

      let normalized = []
      let signature = ""
      let attempts = 0

      while (attempts < 3) {
        const requestId = crypto.randomUUID()
        normalized = await createQuestions({ requestId, avoidList })
        signature = buildQuestionsSignature(normalized)
        if (normalized.length && signature !== lastSignature) {
          break
        }
        attempts += 1
      }

      if (!normalized.length) {
        normalized = generateLocalQuestions()
        signature = buildQuestionsSignature(normalized)
      }

      if (signature && signature === lastSignature) {
        const locallyGenerated = generateLocalQuestions()
        normalized = locallyGenerated
        signature = buildQuestionsSignature(normalized)
      }

      localStorage.setItem("lastQuestionSignature", signature)
      localStorage.setItem(
        "lastQuestions",
        JSON.stringify(
          normalized.map((question) => question.prompt).slice(0, 16)
        )
      )
      setQuestions(normalized)
      setStatus("ready")
    } catch (err) {
      setError(err)
      const generated = generateLocalQuestions()
      localStorage.setItem(
        "lastQuestionSignature",
        buildQuestionsSignature(generated)
      )
      localStorage.setItem(
        "lastQuestions",
        JSON.stringify(generated.map((question) => question.prompt).slice(0, 16))
      )
      setQuestions(generated)
      setStatus("ready")
    }
  }, [])

  const selectAnswer = useCallback((answer) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = answer
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
    }),
    [status, questions, answers, currentIndex, error, startMission, selectAnswer, resetMission]
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
