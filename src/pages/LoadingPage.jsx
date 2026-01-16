import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import PrimaryButton from "../components/PrimaryButton.jsx"
import useQuiz from "../hooks/useQuiz"

function LoadingPage() {
  const navigate = useNavigate()
  const { status, questions, error, startMission } = useQuiz()

  useEffect(() => {
    if (status === "idle") {
      startMission()
    }
  }, [startMission, status])

  useEffect(() => {
    if (status === "ready" && questions.length > 0) {
      const timer = setTimeout(() => navigate("/quiz"), 800)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [navigate, questions.length, status])

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        src="/intro.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="relative z-10 flex max-w-lg flex-col items-center gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-300">
          Generating mission
        </p>
        <h1 className="text-2xl font-semibold md:text-3xl">
          AI가 질문을 만들고 있어요
        </h1>
        <p className="text-sm text-gray-300">
          잠시만 기다려 주세요. 멋진 미션이 곧 시작됩니다.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading
        </div>
        {error && (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
            네트워크 문제가 발생했어요. 기본 질문으로 시작할게요.
          </div>
        )}
        {status !== "ready" && (
          <PrimaryButton onClick={startMission}>Retry</PrimaryButton>
        )}
      </div>
    </main>
  )
}

export default LoadingPage
