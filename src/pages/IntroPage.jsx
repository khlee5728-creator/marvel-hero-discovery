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
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
          Marvel Hero Discovery
        </p>
        <h1 className="text-4xl font-bold md:text-5xl">
          Choose Your Heroic Path
        </h1>
        <p className="max-w-xl text-sm text-gray-300 md:text-base">
          12개의 선택으로 MBTI를 분석하고, 마블 세계관 속 나만의 히어로를
          찾아봅니다.
        </p>
      </div>
      <PrimaryButton onClick={handleStart}>
        <span className="flex items-center gap-2">
          <Play size={16} />
          START MISSION
        </span>
      </PrimaryButton>
    </main>
  )
}

export default IntroPage
