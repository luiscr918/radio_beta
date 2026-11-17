import { useState } from 'react'
import Swal from 'sweetalert2'
import { Newspaper } from 'lucide-react'
import { CATEGORIAS, NOTICIAS } from '../data/news'

export default function News() {
  const [cat, setCat] = useState('Todas')
  const lista = cat === 'Todas' ? NOTICIAS : NOTICIAS.filter((n) => n.categoria === cat)
  const [principal, ...resto] = lista

  const abrir = (n) =>
    Swal.fire({
      title: n.titulo,
      html: `<p style="text-align:left;line-height:1.6">${n.cuerpo}</p><p style="text-align:left;margin-top:12px;color:#667;font-size:.85rem">${n.categoria} · ${n.fecha}</p>`,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#10242b',
    })

  return (
    <section id="noticias" className="mx-auto max-w-5xl px-4 pb-32 pt-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-3xl font-extrabold">
          <Newspaper className="text-teal" /> Últimas noticias
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`font-display rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                cat === c ? 'bg-ink text-paper' : 'bg-mist text-ink hover:bg-ink/15'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {!principal ? (
        <p className="mt-10 text-ink/70">No hay noticias en esta categoría todavía.</p>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-5">
          <button onClick={() => abrir(principal)} className="group md:col-span-3 text-left">
            <div className="aspect-video w-full rounded-2xl bg-teal/90 p-6 text-paper/90">
              <span className="font-display text-sm">{principal.categoria}</span>
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight group-hover:underline">{principal.titulo}</h3>
            <p className="mt-2 text-ink/80">{principal.resumen}</p>
            <p className="mt-1 text-sm text-ink/60">{principal.fecha}</p>
          </button>

          <ul className="space-y-5 md:col-span-2">
            {resto.map((n) => (
              <li key={n.id} className="border-b border-ink/15 pb-5">
                <button onClick={() => abrir(n)} className="text-left">
                  <p className="font-display text-sm text-teal">{n.categoria} · {n.fecha}</p>
                  <h3 className="text-lg font-extrabold leading-snug hover:underline">{n.titulo}</h3>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
