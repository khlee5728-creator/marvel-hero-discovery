import { useNavigate } from "react-router-dom"
import { Play } from "lucide-react"
import PrimaryButton from "../components/PrimaryButton.jsx"
import useQuiz from "../hooks/useQuiz"

function IntroPage() {
  const navigate = useNavigate()
  const { startMission } = useQuiz()

  const handleStart = () => {
    startMission()
    navigate("/loading")
  }

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/intro/marvel-intro.png')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-200">
          Marvel Hero Discovery
        </p>
        <h1 className="text-4xl font-bold md:text-5xl">
          Choose Your Heroic Path
        </h1>
        <p className="max-w-xl text-sm text-gray-200 md:text-base">
          16개의 선택으로 MBTI를 분석하고, 마블 세계관 속 나만의 히어로를
          찾아봅니다.
        </p>
      </div>
      <div className="relative z-10 mt-6">
        <PrimaryButton onClick={handleStart}>
          <span className="flex items-center gap-2">
            <Play size={16} />
            START MISSION
          </span>
        </PrimaryButton>
      </div>
    </main>
  )
}

export default IntroPage
