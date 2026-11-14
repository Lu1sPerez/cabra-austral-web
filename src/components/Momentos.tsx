import Galeria from "./Galeria";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

type Momento = { foto: string | null; pie: string; indicacion: string };

// "Momentos": fotos del local, la barra y la gente (public/fotos/local-1.jpg … ver src/data/momentos.ts).
// Mientras no haya ninguna foto subida, la sección no aparece.
export default function Momentos({ idioma, momentos }: { idioma: Idioma; momentos: Momento[] }) {
  const t = TEXTOS[idioma].momentos;
  return <Galeria id="momentos" fotos={momentos} textos={{ ...t, titulo: [t.titulo] }} />;
}
