import type { CSSProperties } from "react";
import Foto from "./Foto";
import { TextoMarca } from "./Logo";
import { CABRA_PATH, CABRA_VIEWBOX } from "@/lib/logo-paths";
import { LINKS, NEGOCIO } from "@/lib/negocio";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";

type Props = { fotoVertical: string | null; fotoHorizontal: string | null };

const LINEAS = [
  { texto: "Hecho", claro: false },
  { texto: "a mano", claro: false },
  { texto: "en Perito", claro: true },
  { texto: "Moreno", claro: true },
];

// Retraso escalonado para las animaciones de entrada (ver globals.css)
const orden = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

export default function Hero({ fotoVertical, fotoHorizontal }: Props) {
  const alt = "El salón de Cabra Austral, con la barra y el arco de ladrillo";
  return (
    <>
      {/* Pantalla de carga: la cabra se dibuja a mano y se rellena, sube el nombre,
          corre el contador y el telón sube en dos capas. Solo la primera vez en la visita,
          y nunca con "reducir movimiento" (ver globals.css). */}
      <div className="intro-capa" aria-hidden="true" />
      <div className="intro" aria-hidden="true">
        <div className="intro-aparece etiqueta flex justify-between text-niebla">
          <span>cabra austral</span>
          <span>café · panadería · pastelería</span>
        </div>

        <div className="flex flex-col items-center">
          <svg viewBox={CABRA_VIEWBOX} className="intro-logo h-auto w-36 md:w-48" focusable="false">
            <path d={CABRA_PATH} pathLength={1} />
          </svg>
          <span className="intro-marca mt-5">
            <TextoMarca className="h-16 w-auto md:h-20" />
          </span>
        </div>

        <div className="flex items-end justify-between">
          <p className="intro-aparece etiqueta text-niebla">
            perito moreno · santa cruz
            <br />
            desde {NEGOCIO.desde}
          </p>
          <p className="font-display text-6xl leading-none md:text-8xl">
            <span className="intro-contador" />
            <span className="ml-1 align-top text-2xl md:text-3xl">%</span>
          </p>
        </div>
        <div className="intro-barra" />
      </div>

      <section
        id="inicio"
        aria-labelledby="titulo-portada"
        className="relative flex h-svh min-h-[600px] items-end overflow-hidden bg-noche text-marfil"
      >
        {/* Foto a sangre: vertical en el celular, horizontal en pantallas grandes */}
        <div className="intro-foto absolute inset-0 top-14 md:hidden">
          <Foto src={fotoVertical} alt={alt} indicacion="Portada vertical: la barra con la máquina, luz de mañana" oscuro priority />
        </div>
        <div className="intro-foto absolute inset-0 top-16 hidden md:block">
          <Foto src={fotoHorizontal} alt={alt} indicacion="Portada horizontal: la barra completa, de lado" oscuro />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/55 to-noche/0" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 md:pb-14">
          <p
            className="entra mb-5 flex flex-wrap gap-x-3 gap-y-1 text-[12px] lowercase tracking-etiqueta text-marfil/85"
            style={orden(0)}
          >
            <span>café · panadería · pastelería</span>
            <span>todo hecho acá · desde {NEGOCIO.desde}</span>
          </p>

          <h1 id="titulo-portada" className="titulo-portada">
            {LINEAS.map((l, i) => (
              <span key={l.texto} className="linea">
                <span className={l.claro ? "text-niebla" : undefined} style={orden(i)}>
                  {l.texto}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="entra max-w-md text-base leading-relaxed text-marfil/90" style={orden(1)}>
              Horneamos todo en el local: medialunas, chipá, scones, tortas y alfajores. El café lo preparamos taza por
              taza.
            </p>
            <div className="entra flex flex-wrap gap-3" style={orden(2)}>
              <a href="#menu" className="boton bg-marfil text-noche hover:bg-niebla">
                Ver el menú
              </a>
              <a
                href={LINKS.comoLlegar}
                target="_blank"
                rel="noopener noreferrer"
                className="boton border border-marfil/70 text-marfil hover:bg-marfil/10"
              >
                Cómo llegar
              </a>
            </div>
          </div>
        </div>

        {(fotoVertical || fotoHorizontal || MOSTRAR_MARCADORES) && (
          <p className="entra pie-foto absolute bottom-3 right-4 text-marfil/75 sm:right-6" style={orden(3)}>
            el salón y la barra
          </p>
        )}
      </section>
    </>
  );
}
