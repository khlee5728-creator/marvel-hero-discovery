import { createContext, useCallback, useMemo, useState } from "react"
import fallbackQuestions from "../data/fallbackQuestions"
import { createQuestions } from "../services/mbtiService"
import {
  buildQuestionsSignature,
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
      const requestId = crypto.randomUUID()
      let normalized = await createQuestions({ requestId })
      let signature = buildQuestionsSignature(normalized)

      if (!normalized.length) {
        normalized = shuffleQuestions(fallbackQuestions)
        signature = buildQuestionsSignature(normalized)
      }

      if (signature && signature === lastSignature) {
        const retryRequestId = crypto.randomUUID()
        const retry = await createQuestions({ requestId: retryRequestId })
        const retrySignature = buildQuestionsSignature(retry)
        if (retry.length && retrySignature !== lastSignature) {
          normalized = retry
          signature = retrySignature
        } else {
          normalized = shuffleQuestions(normalized)
          signature = buildQuestionsSignature(normalized)
        }
      }

      localStorage.setItem("lastQuestionSignature", signature)
      setQuestions(normalized)
      setStatus("ready")
    } catch (err) {
      setError(err)
      const shuffledFallback = shuffleQuestions(fallbackQuestions)
      localStorage.setItem(
        "lastQuestionSignature",
        buildQuestionsSignature(shuffledFallback)
      )
      setQuestions(shuffledFallback)
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
