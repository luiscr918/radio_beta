// Dial de sintonía: la aguja se desplaza a la frecuencia al dar play.
export default function Dial({ playing, frecuencia }) {
  const ticks = Array.from({ length: 41 })
  const pos = playing ? ((parseFloat(frecuencia) - 88) / 20) * 100 : 6

  return (
    <div className="relative mt-10 h-24 w-full select-none" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-6 flex items-end justify-between">
        {ticks.map((_, i) => (
          <span
            key={i}
            className="w-px bg-ink/50"
            style={{ height: i % 5 === 0 ? 28 : 14 }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-between font-display text-sm text-ink/70">
        {[88, 93, 98, 103, 108].map((n) => <span key={n}>{n}</span>)}
      </div>
      <div
        className="absolute bottom-6 h-20 w-0.5 bg-signal transition-[left] duration-[1400ms] ease-out"
        style={{ left: `${pos}%` }}
      />
    </div>
  )
}
