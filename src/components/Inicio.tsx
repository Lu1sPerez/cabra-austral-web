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
import Movimiento from "@/components/Movimiento";
import Marquesina from "@/components/Marquesina";
import Galeria from "@/components/Galeria";
import JsonLd from "@/components/JsonLd";
import type { Menu as MenuDatos } from "@/lib/menu";
import { foto } from "@/lib/fotos";
import { PIEZAS } from "@/data/archivo";
import { MOMENTOS } from "@/data/momentos";
import { FOTOS_MENU } from "@/data/menu-fotos";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

// La página de inicio completa. La usan las dos versiones: "/" (castellano) y "/en" (inglés).
export default function Inicio({ idioma, menu }: { idioma: Idioma; menu: MenuDatos }) {
  const ingles = idioma === "en";

  const fotosArchivo = Object.fromEntries(
    PIEZAS.map((p) => [p.id, { a: foto(`archivo/${p.id}-a`), b: foto(`archivo/${p.id}-b`) }]),
  );
  const momentos = MOMENTOS.map((m) => ({ ...m, pie: ingles ? m.pieEn : m.pie, foto: foto(m.foto) }));
  const fotosMenu = FOTOS_MENU.map((f) => ({ ...f, pie: ingles ? f.pieEn : f.pie, foto: foto(f.foto) }));
  // La foto del tostado con café acompaña a las promos. Las semanas sin promos pasa a la galería, así no se pierde.
  const fotoCafe = foto("cafe-servido");
  if (menu.promos.length === 0 && fotoCafe) {
    fotosMenu.push({ foto: fotoCafe, pie: TEXTOS[idioma].promos.pie, pieEn: TEXTOS.en.promos.pie, indicacion: "" });
  }

  return (
    <>
      <JsonLd idioma={idioma} />
      <Header idioma={idioma} />
      <main id="contenido">
        {/* La portada queda fija y el manifiesto sube por encima, como una lámina */}
        <div className="relative">
          <Hero idioma={idioma} fotoVertical={foto("portada-vertical")} fotoHorizontal={foto("portada-horizontal")} />
          <Manifiesto idioma={idioma} />
        </div>
        <Marquesina idioma={idioma} />
        <Galeria id="galeria" fotos={fotosMenu} textos={TEXTOS[idioma].galeria} />
        <Menu idioma={idioma} categorias={menu.categorias} />
        <Promos idioma={idioma} promos={menu.promos} fotoCafe={fotoCafe} />
        <Archivo idioma={idioma} fotos={fotosArchivo} />
        <Momentos idioma={idioma} momentos={momentos} />
        <Visitanos idioma={idioma} fotoFachada={foto("fachada")} />
      </main>
      <Footer idioma={idioma} />
      <Reveal />
      <Movimiento />
    </>
  );
}
