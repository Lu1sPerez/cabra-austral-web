import Dibujo from "./Dibujo";
import { DIBUJOS } from "@/data/dibujos";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

// Franja de palabras enormes con los dibujos de la carta entre medio.
// No se mueve sola: se desliza mientras scrolleás (una fila para cada lado).
// Es decorativa (dice lo mismo que el manifiesto), por eso los lectores de pantalla la saltean.
// Las palabras se cambian en src/i18n/textos.ts ("marquesina").

export default function Marquesina({ idioma }: { idioma: Idioma }) {
  const palabras = TEXTOS[idioma].marquesina;
  const alReves = [...palabras].reverse();

  const fila = (lista: string[], sentido: "ida" | "vuelta") => (
    <div className="marquesina-fila" data-sentido={sentido}>
      {[0, 1].map((copia) =>
        lista.map((palabra, i) => (
          <span key={`${copia}-${palabra}`} className="flex items-center">
            <span className={(i + (sentido === "ida" ? 0 : 1)) % 2 ? "marquesina-hueca" : undefined}>{palabra}</span>
            <Dibujo dibujo={DIBUJOS[(i + (sentido === "ida" ? 0 : 2)) % DIBUJOS.length]} className="marquesina-dibujo" />
          </span>
        )),
      )}
    </div>
  );

  return (
    <div className="marquesina solape bg-marfil pb-16 pt-4 md:pb-24 md:pt-8" data-recorrido aria-hidden="true">
      {fila(palabras, "ida")}
      {fila(alReves, "vuelta")}
    </div>
  );
}
