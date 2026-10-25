import { Cabra, TextoMarca } from "./Logo";

const LINKS = [
  { href: "#menu", texto: "Menú" },
  { href: "#archivo", texto: "Mates" },
  { href: "#visitanos", texto: "Visítanos" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-borde/70 bg-marfil/90 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-16"
      >
        <a href="#inicio" className="flex items-center gap-2 text-pizarra" aria-label="Cabra Austral, ir al inicio">
          <Cabra className="h-8 w-auto md:h-9" />
          <TextoMarca className="h-[26px] w-auto md:h-[30px]" />
        </a>
        <ul className="flex items-center gap-4 text-[13px] font-semibold text-noche sm:gap-7 sm:text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="enlace-subrayado py-2">
                {l.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
