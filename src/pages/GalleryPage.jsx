import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import heroMatches from "../data/heroMatches"

function GalleryPage() {
  const navigate = useNavigate()
  const heroes = useMemo(
    () =>
      Object.entries(heroMatches).map(([mbti, hero]) => ({
        mbti,
        ...hero,
      })),
    []
  )

  return (
    <main className="flex h-full flex-1 flex-col gap-8 overflow-y-auto bg-gradient-to-b from-black via-slate-950 to-slate-900 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Hero Gallery
          </p>
          <h1 className="text-2xl font-bold md:text-3xl">
            16 Heroes of the Marvel Mission
          </h1>
        </div>
        <button
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-wide text-gray-100 hover:bg-white/20"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {heroes.map((hero) => (
          <div
            key={hero.mbti}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            <div className="flex w-full items-center justify-center bg-white/5 p-3">
              <div className="aspect-square w-full max-w-[160px] overflow-hidden rounded-xl bg-black/30">
                <img
                  className="h-full w-full object-cover"
                  src={`/assets/characters/${hero.image}`}
                  alt={hero.name}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-100">
                  {hero.name}
                </h2>
                <span className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  {hero.mbti}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {hero.traits.map((trait) => (
                  <span
                    key={`${hero.mbti}-${trait}`}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-gray-100"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default GalleryPage
