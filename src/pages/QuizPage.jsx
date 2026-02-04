import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { GiChatBubble } from "react-icons/gi"
import PowerGauge from "../components/PowerGauge.jsx"
import useQuiz from "../hooks/useQuiz"

function QuizPage() {
  const navigate = useNavigate()
  const { questions, currentIndex, selectAnswer, status } = useQuiz()
  const total = questions.length
  const question = questions[currentIndex]
  const answerSfx = useMemo(() => {
    const audio = new Audio("/assets/sfx/answer.mp3")
    audio.volume = 0.6
    return audio
  }, [])

  useEffect(() => {
    if (status === "idle") {
      navigate("/")
    }
  }, [navigate, status])

  const handleSelect = (option) => {
    answerSfx.currentTime = 0
    answerSfx.play().catch(() => {})
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
    <main className="relative flex flex-1 flex-col overflow-hidden px-6 py-6">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/bg/hero-base.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 pt-6">
        <div
          className="text-lg uppercase tracking-[0.1em] text-gray-200 md:text-xl"
          style={{ fontFamily: "'Bangers', system-ui" }}
        >
          Marvel Hero Discovery
        </div>
        <PowerGauge current={Math.min(currentIndex + 1, total)} total={total} />
        <section className="space-y-6 rounded-2xl bg-black/55 p-6 text-white backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-300">
              Question {currentIndex + 1} / {total}
            </p>
            <h2 className="group flex items-center gap-2 text-xl font-semibold drop-shadow md:text-2xl">
              <GiChatBubble className="text-lg text-yellow-300 transition-transform duration-200 group-hover:scale-110" />
              {question.prompt}
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {question.options.map((option, index) => (
              <button
                key={`${question.id}-${index}`}
                className="rounded-xl border border-white/20 bg-white/10 p-4 text-left text-base text-white hover:border-red-400 hover:bg-white/15"
                onClick={() => handleSelect(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default QuizPage
