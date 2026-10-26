"use client";

import { useEffect, useRef, useState } from "react";
import Trazo from "./Trazo";

// El momento protagonista de la web: la sección queda fija mientras scrolleás,
// el trazo se dibuja de punta a punta y las palabras destacadas se van marcando.
// Con "reducir movimiento" activado, todo aparece completo y sin fijar.

type Tramo = { texto: string; destacado?: boolean };

const TEXTO: Tramo[] = [
  { texto: "En Cabra Austral " },
  { texto: "todo sale de acá", destacado: true },
  { texto: ": la masa de las medialunas, el chipá, los scones, las tortas y los alfajores. El café se cuida " },
  { texto: "en cada detalle", destacado: true },
  { texto: ", el mate se ceba " },
  { texto: "sin apuro", destacado: true },
  { texto: ", y afuera puede soplar el viento que " },
  { texto: "adentro la mesa está servida", destacado: true },
  { texto: "." },
];

const TOTAL_DESTACADOS = TEXTO.filter((t) => t.destacado).length;

export default function Manifiesto() {
  const seccion = useRef<HTMLElement>(null);
  const [encendidos, setEncendidos] = useState(0);

  useEffect(() => {
    const el = seccion.current;
    if (!el) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const actualizar = () => {
      frame = 0;
      if (reducir.matches) {
        el.style.setProperty("--d", "0");
        setEncendidos(TOTAL_DESTACADOS);
        return;
      }
      const rect = el.getBoundingClientRect();
      const recorrido = el.offsetHeight - window.innerHeight;
      const avance = recorrido > 0 ? Math.min(1, Math.max(0, -rect.top / recorrido)) : 1;
      // El trazo se dibuja entre el 8% y el 85% del recorrido
      const p = Math.min(1, Math.max(0, (avance - 0.08) / 0.77));
      el.style.setProperty("--d", (1 - p).toFixed(4));
      setEncendidos(Math.floor(p * (TOTAL_DESTACADOS + 0.999)));
    };
    const pedir = () => {
      if (!frame) frame = requestAnimationFrame(actualizar);
    };

    actualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    reducir.addEventListener("change", pedir);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      reducir.removeEventListener("change", pedir);
    };
  }, []);

  let indice = 0;

  return (
    <section
      ref={seccion}
      id="manifiesto"
      aria-labelledby="titulo-manifiesto"
      className="manifiesto relative bg-marfil text-noche"
      style={{ ["--d" as string]: 1 }}
    >
      <div className="manifiesto-fijo mx-auto flex max-w-6xl flex-col justify-center px-4 sm:px-6">
        <p className="etiqueta mb-6 text-piedra">
          <span id="titulo-manifiesto">manifiesto</span> · perito moreno, santa cruz
        </p>

        <p className="texto-manifiesto">
          {TEXTO.map((tramo, i) => {
            if (!tramo.destacado) return <span key={i}>{tramo.texto}</span>;
            indice += 1;
            const encendido = indice <= encendidos;
            return (
              <mark key={i} className="palabra-destacada" data-encendida={encendido}>
                {tramo.texto}
              </mark>
            );
          })}
        </p>

        <Trazo animado grosor={4.5} className="mt-8 h-auto w-full max-w-xl text-pizarra md:mt-10" />
      </div>
    </section>
  );
}
