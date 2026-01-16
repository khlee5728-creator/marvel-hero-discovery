import { createContext, useCallback, useMemo, useState } from "react"
import fallbackQuestions from "../data/fallbackQuestions"
import { createQuestions } from "../services/mbtiService"

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
      const normalized = await createQuestions()
      setQuestions(normalized.length ? normalized : fallbackQuestions)
      setStatus("ready")
    } catch (err) {
      setError(err)
      setQuestions(fallbackQuestions)
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
