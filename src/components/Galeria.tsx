"use client";

import { useEffect, useRef, useState } from "react";
import Foto from "./Foto";
import Titulo from "./Titulo";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";

type FotoGaleria = { foto: string | null; pie: string; indicacion: string };
type Props = {
  id: string;
  fotos: FotoGaleria[];
  textos: { etiqueta: string; titulo: string[]; anterior: string; siguiente: string; lista: string };
};

// Galería de fotos: tarjetas grandes que se deslizan con el dedo (o con las flechas en la computadora).
// La usan "Recién hecho" (fotos del menú) y "Momentos" (fotos del local).
// En la web publicada solo aparecen las fotos que ya están subidas; si no hay ninguna, la sección no se muestra.

export default function Galeria({ id, fotos: todas, textos }: Props) {
  const fotos = MOSTRAR_MARCADORES ? todas : todas.filter((f) => f.foto);
  const pista = useRef<HTMLUListElement>(null);
  const [tope, setTope] = useState({ inicio: true, fin: false });

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const medir = () =>
      setTope({ inicio: el.scrollLeft < 8, fin: el.scrollLeft > el.scrollWidth - el.clientWidth - 8 });
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [fotos.length]);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: reducir ? "auto" : "smooth" });
  };

  if (fotos.length === 0) return null;

  return (
    <section aria-labelledby={`titulo-${id}`} className="lamina solape overflow-hidden bg-noche pb-20 pt-20 text-marfil md:pb-28 md:pt-28">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 sm:px-6">
        <div>
          <p className="etiqueta mb-4 text-niebla">{textos.etiqueta}</p>
          <Titulo id={`titulo-${id}`} lineas={textos.titulo} />
        </div>
        <div className="hidden shrink-0 gap-2 pb-2 sm:flex">
          <button type="button" onClick={() => mover(-1)} disabled={tope.inicio} className="boton-redondo" aria-label={textos.anterior}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => mover(1)} disabled={tope.fin} className="boton-redondo" aria-label={textos.siguiente}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ul ref={pista} tabIndex={0} aria-label={textos.lista} className="galeria sin-barra mt-10 md:mt-14">
        {fotos.map((f) => (
          <li key={f.pie} className="galeria-item">
            <figure className="tarjeta-foto">
              <Foto
                src={f.foto}
                alt={f.pie}
                indicacion={f.indicacion}
                proporcion="4 / 5"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 74vw"
                oscuro
              />
              {/* el pie repite el texto alternativo de la foto: se oculta a los lectores de pantalla para no decirlo dos veces */}
              <figcaption aria-hidden="true">{f.pie}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
