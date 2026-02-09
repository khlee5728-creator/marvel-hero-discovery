import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQuiz from "../hooks/useQuiz";

function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, questions, startMission } = useQuiz();
  const startWithSound = Boolean(location.state?.startWithSound);
  const [isMuted, setIsMuted] = useState(!startWithSound);
  const videoRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      startMission();
    }
  }, [startMission, status]);

  useEffect(() => {
    if (!startWithSound) {
      return;
    }
    setIsMuted(false);
    videoRef.current?.play?.();
  }, [startWithSound]);

  useEffect(() => {
    if (status === "ready" && questions.length > 0) {
      navigate("/quiz");
    }
  }, [navigate, questions.length, status]);

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="/assets/bg/loading.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />
      <button
        type="button"
        className="absolute bottom-6 right-6 z-10 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-black/50"
        onClick={() => {
          const nextMuted = !isMuted;
          setIsMuted(nextMuted);
          if (!nextMuted) {
            videoRef.current?.play?.();
          }
        }}
      >
        {isMuted ? "Sound On" : "Sound Off"}
      </button>
      <div className="relative z-10 flex max-w-lg flex-col items-center">
        <h1
          className="hero-title-glow text-2xl font-semibold tracking-[0.1em] text-white drop-shadow md:text-3xl"
          style={{ fontFamily: "'Barlow Condensed', system-ui" }}
        >
          AI is preparing your hero mission
        </h1>
      </div>
    </main>
  );
}

export default LoadingPage;
