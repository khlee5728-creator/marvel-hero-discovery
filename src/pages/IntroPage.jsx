import { useNavigate } from "react-router-dom"
import { GiRocket } from "react-icons/gi"
import PrimaryButton from "../components/PrimaryButton.jsx"
import useQuiz from "../hooks/useQuiz"

function IntroPage() {
  const navigate = useNavigate()
  const { startMission } = useQuiz()

  const handleStart = () => {
    startMission()
    navigate("/loading", { state: { startWithSound: true } })
  }

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/intro/marvel-intro.png')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 space-y-3">
        <h1
          className="text-4xl font-extrabold uppercase tracking-[0.1em] text-gray-100 drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)] md:text-6xl"
          style={{ fontFamily: "'Bangers', system-ui" }}
        >
          Marvel Hero Discovery
        </h1>
        <p className="mx-auto max-w-xl text-base text-gray-200 md:text-lg">
          Find your inner superhero through MBTI! Which Avenger are you?
        </p>
      </div>
      <div className="relative z-10 mt-20">
        <PrimaryButton onClick={handleStart}>
          <span className="group flex items-center gap-2">
            <GiRocket className="text-lg text-yellow-300 transition-transform duration-200 group-hover:scale-110" />
            START MISSION
          </span>
        </PrimaryButton>
      </div>
    </main>
  )
}

export default IntroPage
