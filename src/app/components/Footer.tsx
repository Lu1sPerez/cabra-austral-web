import { Cabra, TextoMarca } from "./Logo";
import Trazo from "./Trazo";
import { HORARIOS_TEXTO } from "@/lib/horarios";
import { LINKS, NEGOCIO } from "@/lib/negocio";

export default function Footer() {
  return (
    <footer className="bg-noche pb-10 pt-20 text-marfil">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end gap-4 text-marfil">
          <Cabra className="h-20 w-auto md:h-28" />
          <TextoMarca className="h-16 w-auto md:h-24" />
        </div>
        <Trazo grosor={4} className="mt-8 h-auto w-full max-w-md text-niebla" />

        <div className="mt-14 grid gap-10 border-t border-marfil/20 pt-10 sm:grid-cols-3">
          <div>
            <h2 className="etiqueta mb-3 text-niebla">dónde</h2>
            <p>
              {NEGOCIO.direccion}
              <br />
              {NEGOCIO.localidad}, {NEGOCIO.provincia}
            </p>
            <a href={LINKS.comoLlegar} target="_blank" rel="noopener noreferrer" className="enlace-subrayado mt-2 inline-block font-semibold">
              Cómo llegar
            </a>
          </div>
          <div>
            <h2 className="etiqueta mb-3 text-niebla">cuándo</h2>
            <ul className="space-y-2">
              {HORARIOS_TEXTO.map((h) => (
                <li key={h.dias}>
                  <span className="block">{h.dias}</span>
                  <span className="block tabular-nums text-marfil/75">{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="etiqueta mb-3 text-niebla">redes</h2>
            <ul className="space-y-2">
              <li>
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="enlace-subrayado font-semibold">
                  Instagram · @{NEGOCIO.instagram}
                </a>
              </li>
              <li>
                <a href={LINKS.whatsapp()} target="_blank" rel="noopener noreferrer" className="enlace-subrayado font-semibold">
                  WhatsApp · {NEGOCIO.whatsappVisible}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-xs text-marfil/70">
          © {NEGOCIO.desde} {NEGOCIO.nombre} · café, panadería y pastelería artesanal en {NEGOCIO.localidad}
        </p>
      </div>
    </footer>
  );
}
