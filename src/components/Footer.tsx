import { Cabra } from "./Logo";
import Dibujo from "./Dibujo";
import { DIBUJOS } from "@/data/dibujos";
import { horariosTexto } from "@/lib/horarios";
import { LINKS, NEGOCIO } from "@/lib/negocio";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

export default function Footer({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].footer;
  return (
    <footer className="lamina overflow-hidden bg-noche pt-16 text-marfil md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <Cabra className="h-16 w-auto md:h-24" />
          <div className="flex items-end gap-4 text-niebla/80 md:gap-7">
            {DIBUJOS.map((d) => (
              <Dibujo key={d.nombre} dibujo={d} className="h-8 w-auto md:h-12" />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-marfil/20 pt-10 sm:grid-cols-3">
          <div>
            <h2 className="etiqueta mb-3 text-niebla">{t.donde}</h2>
            <p>
              {NEGOCIO.direccion}
              <br />
              {NEGOCIO.localidad}, {NEGOCIO.provincia}
            </p>
            <a href={LINKS.comoLlegar} target="_blank" rel="noopener noreferrer" className="enlace-subrayado mt-2 inline-block font-semibold">
              {t.comoLlegar}
            </a>
          </div>
          <div>
            <h2 className="etiqueta mb-3 text-niebla">{t.cuando}</h2>
            <ul className="space-y-2">
              {horariosTexto(idioma).map((h) => (
                <li key={h.dias}>
                  <span className="block">{h.dias}</span>
                  <span className="block tabular-nums text-marfil/75">{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="etiqueta mb-3 text-niebla">{t.redes}</h2>
            <ul className="space-y-2">
              <li>
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="enlace-subrayado font-semibold">
                  Instagram · @{NEGOCIO.instagram}
                </a>
              </li>
              <li>
                <a href={LINKS.whatsapp(TEXTOS[idioma].whatsapp)} target="_blank" rel="noopener noreferrer" className="enlace-subrayado font-semibold">
                  WhatsApp · {NEGOCIO.whatsappVisible}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-xs text-marfil/70">
          <p>
            © {NEGOCIO.desde} {NEGOCIO.nombre} · {t.rubro(NEGOCIO.localidad)}
          </p>
          <a href="#inicio" className="enlace-subrayado font-semibold text-marfil">
            {t.arriba}
          </a>
        </div>
      </div>

      {/* El nombre, enorme, apoyado en el borde de la página */}
      <p className="pie-marca mt-10 md:mt-14" aria-hidden="true">
        {NEGOCIO.nombre}
      </p>
    </footer>
  );
}
