import Foto from "./Foto";
import Titulo from "./Titulo";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

type Props = { idioma: Idioma; promos: string[]; fotoCafe: string | null };

// Las promos salen de la categoría "Promos" del POS.
// Para cambiarlas cada semana: activá o desactivá productos de esa categoría en el POS.
// La web las muestra en la próxima visita. Si no hay ninguna activa, la sección no aparece.

export default function Promos({ idioma, promos, fotoCafe }: Props) {
  if (promos.length === 0) return null;
  const t = TEXTOS[idioma].promos;

  return (
    <section id="promos" aria-labelledby="titulo-promos" className="lamina solape bg-pizarra pb-20 pt-20 text-marfil md:pb-28 md:pt-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-20">
        <div>
          <p className="etiqueta mb-4 text-niebla">{t.etiqueta}</p>
          <Titulo id="titulo-promos" lineas={t.titulo} />
          <ul className="mt-10 border-t border-marfil/30">
            {promos.map((promo) => (
              <li key={promo} className="titulo-promo border-b border-marfil/30 py-5">
                {promo}
              </li>
            ))}
          </ul>
        </div>
        {(fotoCafe || MOSTRAR_MARCADORES) && (
          <figure className="promo-foto relative mx-2 md:mx-0">
            <div className="tarjeta-foto">
              <Foto
                src={fotoCafe}
                alt={t.alt}
                indicacion="Café servido: taza con latte art y dos medialunas, vista desde arriba en diagonal"
                proporcion="4 / 5"
                sizes="(min-width: 768px) 40vw, 100vw"
                oscuro
              />
            </div>
            <figcaption className="promo-etiqueta pie-foto">{t.pie}</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
