import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GiCycle, GiPhotoCamera } from "react-icons/gi";
import PrimaryButton from "../components/PrimaryButton.jsx";
import heroMatches from "../data/heroMatches";
import useQuiz from "../hooks/useQuiz";
import { calculateMbti } from "../utils/mbti";

function ResultPage() {
  const navigate = useNavigate();
  const { answers, resetMission } = useQuiz();

  const result = useMemo(() => {
    const mbti = calculateMbti(answers);
    return {
      mbti,
      hero: heroMatches[mbti] || heroMatches.ENFP,
    };
  }, [answers]);

  const handleRestart = () => {
    resetMission();
    navigate("/");
  };

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <div
        className="absolute left-6 top-6 text-lg uppercase tracking-[0.1em] text-gray-200 md:text-xl"
        style={{ fontFamily: "'Bangers', system-ui" }}
      >
        Marvel Hero Discovery
      </div>
      <div className="absolute right-6 top-6">
        <button
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-wide text-gray-100 transition hover:bg-white/20"
          onClick={() => navigate("/gallery")}
        >
          <GiPhotoCamera className="text-lg text-yellow-300 transition-transform duration-200 group-hover:scale-110" />
          Hero Gallery
        </button>
      </div>
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
        className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/20 via-white/10 to-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-6 p-8 md:grid-cols-[260px,1fr] md:items-center md:text-left">
          <div className="h-64 w-full overflow-hidden rounded-2xl bg-black/40">
            {result.hero.video ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster={`/assets/characters/${result.hero.image}`}
              >
                <source
                  src={`/assets/characters/${result.hero.video}`}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                className="h-full w-full object-cover"
                src={`/assets/characters/${result.hero.image}`}
                alt={result.hero.name}
              />
            )}
          </div>
          <div className="space-y-4 text-center">
            <p className="text-base text-gray-200">
              You match {result.hero.name}.<br />
              You have a hero heart.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {result.hero.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm uppercase tracking-wide text-gray-100"
                >
                  {trait}
                </span>
              ))}
            </div>
            <div className="rounded-2xl bg-black/40 p-5 text-sm text-gray-300">
              Your choices help the team. Ready for a new mission?
            </div>
          </div>
        </div>
      </motion.div>
      <PrimaryButton
        onClick={handleRestart}
        className="transition-transform hover:scale-[1.03] active:scale-[0.98]"
      >
        <span className="group flex items-center gap-2">
          <GiCycle className="text-lg text-yellow-300 transition-transform duration-200 group-hover:scale-110" />
          NEW MISSION
        </span>
      </PrimaryButton>
    </main>
  );
}

export default ResultPage;
