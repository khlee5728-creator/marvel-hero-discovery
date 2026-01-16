import { useMemo } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import PrimaryButton from "../components/PrimaryButton.jsx"
import heroMatches from "../data/heroMatches"
import useQuiz from "../hooks/useQuiz"
import { calculateMbti } from "../utils/mbti"

function ResultPage() {
  const navigate = useNavigate()
  const { answers, resetMission } = useQuiz()

  const result = useMemo(() => {
    const mbti = calculateMbti(answers)
    return {
      mbti,
      hero: heroMatches[mbti] || heroMatches.ENFP,
    }
  }, [answers])

  const handleRestart = () => {
    resetMission()
    navigate("/")
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
          Your Hero Match
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">{result.hero.name}</h1>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
          {result.mbti || "ENFP"}
        </p>
      </div>
      <motion.div
        className="flex w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-6 p-6 md:grid-cols-[220px,1fr] md:items-center md:text-left">
          <div className="h-56 w-full overflow-hidden rounded-2xl bg-black/40">
            <img
              className="h-full w-full object-cover"
              src={`/assets/characters/${result.hero.image}`}
              alt={result.hero.name}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-200">
              {result.hero.name} 님은 이런 성향을 가지고 있어요.
            </p>
            <div className="flex flex-wrap gap-2">
              {result.hero.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-gray-100"
                >
                  {trait}
                </span>
              ))}
            </div>
            <div className="rounded-2xl bg-black/40 p-4 text-xs text-gray-300">
              Marvel 세계관 속에서 당신의 선택은 팀에 새로운 힘을 줍니다.
              새로운 미션을 시작해 또 다른 히어로를 만나보세요.
            </div>
          </div>
        </div>
      </motion.div>
      <PrimaryButton onClick={handleRestart}>NEW MISSION</PrimaryButton>
    </main>
  )
}

export default ResultPage
