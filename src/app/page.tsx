import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifiesto from "@/components/Manifiesto";
import Menu from "@/components/Menu";
import Promos from "@/components/Promos";
import Archivo from "@/components/Archivo";
import Momentos from "@/components/Momentos";
import Visitanos from "@/components/Visitanos";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { obtenerMenu } from "@/lib/menu";
import { foto } from "@/lib/fotos";
import { PIEZAS } from "@/data/archivo";
import { MOMENTOS } from "@/data/momentos";
import { FOTOS_MENU } from "@/data/menu-fotos";

// La página se arma en cada visita, así el menú y las promos siempre son los que están activos en el POS.
// (Antes se guardaba una copia y Vercel la actualizaba recién después de una visita: si nadie entraba, quedaba vieja.)
export const dynamic = "force-dynamic";

export default async function Inicio() {
  const menu = await obtenerMenu();

  const fotosArchivo = Object.fromEntries(
    PIEZAS.map((p) => [p.id, { a: foto(`archivo/${p.id}-a`), b: foto(`archivo/${p.id}-b`) }]),
  );
  const momentos = MOMENTOS.map((m) => ({ ...m, foto: foto(m.foto) }));

  return (
    <>
      <JsonLd />
      <Header />
      <main id="contenido">
        <Hero fotoVertical={foto("portada-vertical")} fotoHorizontal={foto("portada-horizontal")} />
        <Manifiesto />
        <Menu categorias={menu.categorias} fotos={FOTOS_MENU.map((f) => ({ ...f, foto: foto(f.foto) }))} />
        <Promos promos={menu.promos} fotoCafe={foto("cafe-servido")} />
        <Archivo fotos={fotosArchivo} />
        <Momentos momentos={momentos} />
        <Visitanos fotoFachada={foto("fachada")} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
