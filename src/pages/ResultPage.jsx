import { useMemo, useRef, useState } from "react";
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
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const storedAnswers = useMemo(() => {
    try {
      const raw = localStorage.getItem("quizAnswers") || "[]";
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const result = useMemo(() => {
    const effectiveAnswers = answers.length ? answers : storedAnswers;
    const mbti = calculateMbti(effectiveAnswers);
    return {
      mbti,
      hero: heroMatches[mbti] || heroMatches.ENFP,
    };
  }, [answers, storedAnswers]);

  const handleRestart = () => {
    resetMission();
    navigate("/");
  };

  const handleToggleSound = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
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
        className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-4 border-black bg-[#111827]/90 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1.25px,transparent_1.25px)] bg-[length:16px_16px] ring-2 ring-yellow-300/40 shadow-[0_0_30px_rgba(250,204,21,0.18),8px_8px_0_0_rgba(0,0,0,0.85)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between border-b-2 border-black bg-yellow-300 px-6 py-2 text-xs font-bold uppercase tracking-[0.35em] text-black">
          Hero File
          <span className="rounded-full bg-black px-3 py-1 text-[10px] tracking-[0.25em] text-yellow-300">
            Match
          </span>
        </div>
        <div className="grid gap-6 p-8 md:grid-cols-[260px,1fr] md:items-center md:text-left">
          <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-black/40">
            {result.hero.video ? (
              <>
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster={`/assets/characters/${result.hero.image}`}
                >
                  <source
                    src={`/assets/characters/${result.hero.video}`}
                    type="video/mp4"
                  />
                </video>
                <button
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
                  aria-label={isMuted ? "Sound off" : "Sound on"}
                  aria-pressed={!isMuted}
                  onClick={handleToggleSound}
                  type="button"
                >
                  <img
                    className="h-6 w-6"
                    src={`/assets/icons/${isMuted ? "sound-off.svg" : "sound-on.svg"}`}
                    alt={isMuted ? "Sound off" : "Sound on"}
                  />
                </button>
              </>
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
                  className="inline-flex -rotate-3 skew-x-3 items-center rounded-md border-2 border-black bg-yellow-300 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[4px_4px_0_0_rgba(0,0,0,0.85)]"
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
