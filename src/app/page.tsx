import Inicio from "@/components/Inicio";
import { metadataDe } from "@/i18n/metadata";
import { obtenerMenu } from "@/lib/menu";

// Versión en castellano. La versión en inglés está en src/app/en/page.tsx.
// La página se arma en cada visita, así el menú y las promos siempre son los que están activos en el POS.
export const dynamic = "force-dynamic";
export const metadata = metadataDe("es");

export default async function Page() {
  const menu = await obtenerMenu("es");
  return <Inicio idioma="es" menu={menu} />;
}
