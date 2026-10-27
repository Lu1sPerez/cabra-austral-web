"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Dibujo from "./Dibujo";
import { DIBUJOS } from "@/data/dibujos";

// El momento protagonista de la web: la sección queda fija mientras scrolleás
// y los dibujos de la carta se dibujan uno por uno (primero el contorno, después se rellenan),
// mientras las palabras destacadas se van marcando.
// Con "reducir movimiento" activado, todo aparece completo y sin fijar.

type Tramo = { texto: string; destacado?: boolean };

const TEXTO: Tramo[] = [
  { texto: "En Cabra Austral " },
  { texto: "todo sale de acá", destacado: true },
  { texto: ": la masa de las medialunas, el chipá, los scones, las tortas y los alfajores. El café lo preparamos " },
  { texto: "taza por taza", destacado: true },
  { texto: ", el mate se ceba " },
  { texto: "sin apuro", destacado: true },
  { texto: ", y afuera puede soplar el viento que " },
  { texto: "adentro la mesa está servida", destacado: true },
  { texto: "." },
];

const TOTAL_DESTACADOS = TEXTO.filter((t) => t.destacado).length;

// Cómo queda apoyado cada dibujo al terminar (alto relativo y giro), para que la fila
// tenga el aire suelto de la carta y no parezca una grilla.
const POSES = [
  { y: "-6%", giro: -8 },
  { y: "10%", giro: 6 },
  { y: "-10%", giro: -4 },
  { y: "6%", giro: 7 },
  { y: "-4%", giro: -5 },
];

// Cada dibujo ocupa este tramo del recorrido y se solapa un poco con el siguiente
const TRAMO = 0.3;
const PASO = (1 - TRAMO) / (DIBUJOS.length - 1);

const limitar = (v: number) => Math.min(1, Math.max(0, v));

export default function Manifiesto() {
  const seccion = useRef<HTMLElement>(null);
  const dibujos = useRef<(HTMLDivElement | null)[]>([]);
  const [encendidos, setEncendidos] = useState(0);

  useEffect(() => {
    const el = seccion.current;
    if (!el) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pintar = (p: number) => {
      let listos = 0;
      dibujos.current.forEach((d, i) => {
        if (!d) return;
        const q = limitar((p - i * PASO) / TRAMO);
        // contorno: 0 → 75% del tramo; relleno: 60% → 100%; entra subiendo y girando
        d.style.setProperty("--trazo", (1 - limitar(q / 0.75)).toFixed(4));
        d.style.setProperty("--relleno", limitar((q - 0.6) / 0.4).toFixed(3));
        d.style.setProperty("--avance", q.toFixed(4));
        if (q > 0.55) listos += 1;
      });
      // Cada palabra destacada se marca cuando termina "su" dibujo
      setEncendidos(Math.min(TOTAL_DESTACADOS, listos));
    };

    let frame = 0;
    const actualizar = () => {
      frame = 0;
      if (reducir.matches) {
        pintar(1);
        return;
      }
      const rect = el.getBoundingClientRect();
      const recorrido = el.offsetHeight - window.innerHeight;
      const avance = recorrido > 0 ? limitar(-rect.top / recorrido) : 1;
      // Todo ocurre entre el 6% y el 90% del recorrido; el final queda quieto un momento
      pintar(limitar((avance - 0.06) / 0.84));
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
    <section ref={seccion} id="manifiesto" aria-labelledby="titulo-manifiesto" className="manifiesto relative bg-marfil text-noche">
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

        {/* Los dibujos de la carta, uno al lado del otro */}
        <div className="manifiesto-dibujos mt-8 text-pizarra md:mt-12">
          {DIBUJOS.map((d, i) => (
            <div
              key={d.nombre}
              ref={(n) => {
                dibujos.current[i] = n;
              }}
              className="manifiesto-dibujo"
              style={
                {
                  "--trazo": 1,
                  "--relleno": 0,
                  "--avance": 0,
                  "--y": POSES[i % POSES.length].y,
                  "--giro": `${POSES[i % POSES.length].giro}deg`,
                } as CSSProperties
              }
            >
              <Dibujo dibujo={d} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
