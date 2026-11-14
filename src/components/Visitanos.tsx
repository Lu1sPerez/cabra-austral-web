import Foto from "./Foto";
import Titulo from "./Titulo";
import EstadoAbierto from "./EstadoAbierto";
import HorariosHoy from "./HorariosHoy";
import { LINKS, NEGOCIO } from "@/lib/negocio";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

// "Pasá a vernos": dirección, si está abierto ahora, horarios y mapa, en tarjetas.
export default function Visitanos({ idioma, fotoFachada }: { idioma: Idioma; fotoFachada: string | null }) {
  const t = TEXTOS[idioma].visitanos;
  const tarjeta = "bg-papel rounded-[22px] p-6 md:rounded-[28px] md:p-9";
  return (
    <section id="visitanos" aria-labelledby="titulo-visitanos" className="lamina solape scroll-mt-4 bg-niebla pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="etiqueta mb-4 text-pizarra">{t.etiqueta}</p>
        <Titulo id="titulo-visitanos" lineas={t.titulo} className="text-pizarra" />

        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2 md:gap-4">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className={tarjeta}>
              <address className="not-italic">
                <span className="block font-display text-4xl uppercase leading-[0.9] md:text-5xl lg:text-6xl">{NEGOCIO.direccion}</span>
                <span className="mt-3 block text-piedra">
                  {NEGOCIO.localidad}, {NEGOCIO.provincia}
                </span>
              </address>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={LINKS.comoLlegar} target="_blank" rel="noopener noreferrer" className="boton bg-pizarra text-marfil hover:bg-noche">
                  {t.comoLlegar}
                </a>
                <a
                  href={LINKS.whatsapp(TEXTOS[idioma].whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="boton border border-noche text-noche hover:bg-noche hover:text-marfil"
                >
                  {t.whatsapp}
                </a>
              </div>
            </div>

            <div className={`${tarjeta} md:flex-1`}>
              <EstadoAbierto idioma={idioma} />
              <div className="mt-3 border-t border-borde">
                <HorariosHoy idioma={idioma} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            {(fotoFachada || MOSTRAR_MARCADORES) && (
              <figure className="tarjeta-foto">
                <Foto
                  src={fotoFachada}
                  alt={t.altFachada}
                  indicacion="Fachada: el frente del local con el cartel, de día, desde la vereda de enfrente"
                  proporcion="3 / 2"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </figure>
            )}
            <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-[22px] bg-papel md:min-h-[420px] md:rounded-[28px]">
              <iframe
                title={t.mapa}
                src={LINKS.mapaEmbebido(idioma)}
                className="absolute inset-0 h-full w-full grayscale-[40%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
