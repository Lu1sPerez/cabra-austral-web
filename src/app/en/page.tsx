import Inicio from "@/components/Inicio";
import { metadataDe } from "@/i18n/metadata";
import { obtenerMenu } from "@/lib/menu";

// Versión en inglés (/en). Los textos están en src/i18n/textos.ts y el menú en src/i18n/menu-en.ts.
export const dynamic = "force-dynamic";
export const metadata = metadataDe("en");

export default async function Page() {
  const menu = await obtenerMenu("en");
  return <Inicio idioma="en" menu={menu} />;
}
