import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

export default function Player({ radio, playing, onToggle, volume, setVolume }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/15 bg-ink text-paper">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <button
          onClick={onToggle}
          aria-label={playing ? 'Pausar la radio' : 'Escuchar la radio'}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-signal text-white transition-transform hover:scale-105"
        >
          {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="translate-x-0.5" />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-display truncate text-base font-extrabold leading-tight">
            {radio.nombre} {radio.frecuencia} FM
          </p>
          <p className="truncate text-sm text-paper/70">
            {playing ? 'En vivo ahora' : 'Toca play para escuchar'}
          </p>
        </div>

        <div className="flex h-6 items-end gap-0.5" aria-hidden="true">
          {[0, 0.2, 0.4, 0.1, 0.3].map((d, i) => (
            <span
              key={i}
              className={`w-1 rounded-sm bg-signal ${playing ? 'bar' : ''}`}
              style={{ height: '100%', animationDelay: `${d}s`, transform: playing ? undefined : 'scaleY(.2)' }}
            />
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
            aria-label={volume === 0 ? 'Activar sonido' : 'Silenciar'}
            className="text-paper/80 hover:text-white"
          >
            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range" min="0" max="1" step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volumen"
            className="w-24 accent-[#f25c2a]"
          />
        </div>
      </div>
    </div>
  )
}
