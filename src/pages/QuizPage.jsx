import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PowerGauge from "../components/PowerGauge.jsx"
import useQuiz from "../hooks/useQuiz"

function QuizPage() {
  const navigate = useNavigate()
  const { questions, currentIndex, selectAnswer, status } = useQuiz()
  const total = questions.length
  const question = questions[currentIndex]

  useEffect(() => {
    if (status === "idle") {
      navigate("/")
    }
  }, [navigate, status])

  const handleSelect = (option) => {
    selectAnswer({
      questionId: question.id,
      trait: option.trait,
    })

    if (currentIndex >= total - 1) {
      navigate("/result")
    }
  }

  if (!question) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 text-center">
        <p className="text-sm text-gray-300">문항을 불러오는 중입니다...</p>
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-8 px-6 py-10">
      <PowerGauge current={Math.min(currentIndex + 1, total)} total={total} />
      <section className="space-y-6 rounded-2xl bg-white/5 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Question {currentIndex + 1} / {total}
          </p>
          <h2 className="text-xl font-semibold md:text-2xl">
            {question.prompt}
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {question.options.map((option, index) => (
            <button
              key={`${question.id}-${index}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm hover:border-red-500"
              onClick={() => handleSelect(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default QuizPage
