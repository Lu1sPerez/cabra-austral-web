import Foto from "./Foto";
import EstadoAbierto from "./EstadoAbierto";
import { HORARIOS_TEXTO } from "@/lib/horarios";
import { LINKS, NEGOCIO } from "@/lib/negocio";

export default function Visitanos({ fotoFachada }: { fotoFachada: string | null }) {
  return (
    <section id="visitanos" aria-labelledby="titulo-visitanos" className="scroll-mt-14 bg-marfil py-20 md:scroll-mt-16 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <div className="reveal">
          <p className="etiqueta mb-4 text-piedra">visítanos · te esperamos</p>
          <h2 id="titulo-visitanos" className="titulo-seccion text-pizarra">
            Pasá a
            <br />
            vernos
          </h2>

          <address className="mt-10 not-italic">
            <span className="block font-display text-3xl uppercase leading-none md:text-4xl">{NEGOCIO.direccion}</span>
            <span className="mt-2 block text-piedra">
              {NEGOCIO.localidad}, {NEGOCIO.provincia}
            </span>
          </address>

          <div className="mt-8">
            <EstadoAbierto />
            <dl className="mt-4 border-t border-borde">
              {HORARIOS_TEXTO.map((h) => (
                <div key={h.dias} className="flex flex-col gap-1 border-b border-borde py-4 sm:flex-row sm:justify-between">
                  <dt className="font-semibold">{h.dias}</dt>
                  <dd className="tabular-nums text-piedra">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={LINKS.comoLlegar} target="_blank" rel="noopener noreferrer" className="boton bg-pizarra text-marfil hover:bg-noche">
              Cómo llegar
            </a>
            <a
              href={LINKS.whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="boton border border-noche text-noche hover:bg-noche hover:text-marfil"
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </div>

        <div className="reveal flex flex-col gap-6">
          <figure>
            <Foto
              src={fotoFachada}
              alt="La fachada de Cabra Austral sobre la calle 9 de Julio"
              indicacion="Fachada: el frente del local con el cartel, de día, desde la vereda de enfrente"
              proporcion="3 / 2"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <figcaption className="pie-foto mt-3 text-piedra">9 de julio 1453, perito moreno</figcaption>
          </figure>
          <div className="relative w-full overflow-hidden border border-borde bg-niebla" style={{ aspectRatio: "4 / 3" }}>
            <iframe
              title="Mapa: cómo llegar a Cabra Austral"
              src={LINKS.mapaEmbebido}
              className="absolute inset-0 h-full w-full grayscale-[40%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
