import { Cabra, TextoMarca } from "./Logo";
import { COOKIE_IDIOMA, RUTA, type Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

export default function Header({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].header;
  const otro: Idioma = idioma === "es" ? "en" : "es";
  const links = [
    { href: "#menu", texto: t.menu },
    { href: "#archivo", texto: t.archivo },
    { href: "#visitanos", texto: t.visitanos },
  ];

  return (
    // Barra flotante: una píldora de vidrio que deja ver la página por detrás
    <header className="intro-header pointer-events-none fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-3">
      <nav
        aria-label={t.navegacion}
        className="barra pointer-events-auto mx-auto flex h-[52px] max-w-5xl items-center justify-between gap-3 rounded-full pl-4 pr-2.5 md:h-[58px] md:pl-6 md:pr-3.5"
      >
        <a href="#inicio" className="flex shrink-0 items-center gap-2 text-pizarra" aria-label={t.inicio}>
          <Cabra className="h-8 w-auto md:h-9" />
          <TextoMarca className="hidden h-[26px] w-auto min-[400px]:block md:h-[30px]" />
        </a>
        <ul className="flex items-center gap-2.5 text-[13px] font-semibold text-noche min-[380px]:gap-3 sm:gap-7 sm:text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="enlace-subrayado whitespace-nowrap py-2">
                {l.texto}
              </a>
            </li>
          ))}
          <li>
            {/* Cambia de idioma y lo deja guardado para las próximas visitas */}
            <a
              href={`${RUTA[otro]}?${COOKIE_IDIOMA}=${otro}`}
              hrefLang={t.otroIdioma.lang}
              lang={t.otroIdioma.lang}
              aria-label={t.otroIdioma.nombre}
              title={t.otroIdioma.nombre}
              className="selector-idioma"
            >
              {t.otroIdioma.codigo}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
