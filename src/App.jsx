import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { Radio } from 'lucide-react'
import { RADIO } from './config'
import Dial from './components/Dial'
import Player from './components/Player'
import News from './components/News'

export default function App() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const toggle = async () => {
    const audio = audioRef.current
    if (!RADIO.streamUrl) {
      Swal.fire({
        icon: 'info',
        title: 'Transmisión de prueba',
        text: 'En la versión final aquí sonará su radio en vivo. Solo falta conectar el enlace de su transmisión.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#10242b',
      })
      setPlaying((p) => !p)
      return
    }
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        audio.src = RADIO.streamUrl
        await audio.play()
        setPlaying(true)
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo reproducir',
        text: 'Revise su conexión e intente de nuevo.',
        confirmButtonColor: '#10242b',
      })
    }
  }

  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <a href="#" className="font-display flex items-center gap-2 text-xl font-extrabold">
          <Radio className="text-signal" /> {RADIO.nombre}
        </a>
        <nav className="font-display flex gap-6 text-sm font-medium">
          <a href="#noticias" className="hover:underline">Noticias</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-4 pt-10">
          <h1 className="text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">
            {RADIO.frecuencia}
            <span className="ml-2 text-3xl text-teal sm:text-5xl">FM</span>
          </h1>
          <p className="mt-4 max-w-md text-xl">{RADIO.eslogan}</p>
          <Dial playing={playing} frecuencia={RADIO.frecuencia} />
        </section>

        <News />
      </main>

      <audio ref={audioRef} preload="none" />
      <Player radio={RADIO} playing={playing} onToggle={toggle} volume={volume} setVolume={setVolume} />
    </>
  )
}
