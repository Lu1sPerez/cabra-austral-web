import Foto from "./Foto";

type Props = { promos: string[]; fotoCafe: string | null };

// Las promos salen de la categoría "Promos" del POS.
// Para cambiarlas cada semana: activá o desactivá productos de esa categoría en el POS.
// La web se actualiza sola en unos minutos. Si no hay ninguna activa, la sección no aparece.

export default function Promos({ promos, fotoCafe }: Props) {
  if (promos.length === 0) return null;

  return (
    <section id="promos" aria-labelledby="titulo-promos" className="bg-pizarra py-20 text-marfil md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
        <div className="reveal">
          <p className="etiqueta mb-4 text-niebla">cambian cada semana</p>
          <h2 id="titulo-promos" className="titulo-seccion">
            Promos
            <br />
            de la
            <br />
            semana
          </h2>
          <ol className="mt-10 border-t border-marfil/30">
            {promos.map((promo, i) => (
              <li key={promo} className="flex items-baseline gap-5 border-b border-marfil/30 py-5">
                <span className="text-xs font-semibold tabular-nums text-niebla" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="titulo-promo">{promo}</span>
              </li>
            ))}
          </ol>
        </div>
        <figure className="reveal">
          <Foto
            src={fotoCafe}
            alt="Un café servido con medialunas en Cabra Austral"
            indicacion="Café servido: taza con latte art y dos medialunas, vista desde arriba en diagonal"
            proporcion="4 / 5"
            sizes="(min-width: 768px) 40vw, 100vw"
            oscuro
          />
          <figcaption className="pie-foto mt-3 text-niebla">café con leche y dos medialunas, 9:15 am</figcaption>
        </figure>
      </div>
    </section>
  );
}
