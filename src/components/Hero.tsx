import type { CSSProperties } from "react";
import Foto from "./Foto";
import { TextoMarca } from "./Logo";
import { CABRA_PATH, CABRA_VIEWBOX } from "@/lib/logo-paths";
import { LINKS, NEGOCIO } from "@/lib/negocio";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

type Props = { idioma: Idioma; fotoVertical: string | null; fotoHorizontal: string | null };

// Retraso escalonado para las animaciones de entrada (ver globals.css)
const orden = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

export default function Hero({ idioma, fotoVertical, fotoHorizontal }: Props) {
  const t = TEXTOS[idioma].hero;
  const alt = t.alt;
  return (
    <>
      {/* Pantalla de carga: la cabra se dibuja a mano y se rellena, sube el nombre,
          corre el contador y el telón sube en dos capas. Solo la primera vez en la visita,
          y nunca con "reducir movimiento" (ver globals.css). */}
      <div className="intro-capa" aria-hidden="true" />
      <div className="intro" aria-hidden="true">
        <div className="intro-aparece etiqueta flex justify-between text-niebla">
          <span>cabra austral</span>
          <span>{t.rubro}</span>
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
            {t.desde(NEGOCIO.desde)}
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
        className="portada flex h-svh min-h-[600px] items-end overflow-hidden bg-noche text-marfil"
      >
        {/* Foto a sangre: vertical en el celular y en la tablet parada, horizontal en pantallas apaisadas.
            La portada queda fija: al scrollear la foto se acerca apenas y la página sube por encima. */}
        <div className="portada-foto absolute inset-0">
          <div className="intro-foto portada-vertical absolute inset-0">
            <Foto src={fotoVertical} alt={alt} indicacion="Portada vertical: la barra con la máquina, luz de mañana" oscuro priority />
          </div>
          <div className="intro-foto portada-horizontal absolute inset-0">
            <Foto src={fotoHorizontal} alt={alt} indicacion="Portada horizontal: la barra completa, de lado" oscuro />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/55 to-noche/10" aria-hidden="true" />

        <div className="portada-contenido relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 md:pb-14">
          <p
            className="entra mb-5 flex flex-wrap gap-x-3 gap-y-1 text-[12px] lowercase tracking-etiqueta text-marfil/85"
            style={orden(0)}
          >
            <span>{t.rubro}</span>
            <span>{t.hechoAca(NEGOCIO.desde)}</span>
          </p>

          <h1 id="titulo-portada" className="titulo-portada">
            {t.lineas.map((l, i) => (
              <span key={l.texto} className="linea">
                <span className={l.claro ? "text-niebla" : undefined} style={orden(i)}>
                  {l.texto}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="entra max-w-md text-base leading-relaxed text-marfil/90" style={orden(1)}>
              {t.bajada}
            </p>
            <div className="entra flex flex-wrap gap-3" style={orden(2)}>
              <a href="#menu" className="boton bg-marfil text-noche hover:bg-niebla">
                {t.verMenu}
              </a>
              <a
                href={LINKS.comoLlegar}
                target="_blank"
                rel="noopener noreferrer"
                className="boton border border-marfil/70 text-marfil hover:bg-marfil/10"
              >
                {t.comoLlegar}
              </a>
            </div>
          </div>
        </div>

        {(fotoVertical || fotoHorizontal || MOSTRAR_MARCADORES) && (
          <p className="entra pie-foto portada-pie absolute right-4 text-marfil/75 sm:right-6" style={orden(3)}>
            {t.pie}
          </p>
        )}
        <div className="portada-velo" aria-hidden="true" />
      </section>
    </>
  );
}
