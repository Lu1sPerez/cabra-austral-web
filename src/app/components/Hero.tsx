import Foto from "./Foto";
import { LINKS, NEGOCIO } from "@/lib/negocio";

type Props = { fotoVertical: string | null; fotoHorizontal: string | null };

export default function Hero({ fotoVertical, fotoHorizontal }: Props) {
  const alt = "La barra de Cabra Austral por la mañana";
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-portada"
      className="relative flex min-h-[600px] items-end overflow-hidden bg-noche text-marfil h-svh"
    >
      {/* Foto a sangre: vertical en el celular, horizontal en pantallas grandes */}
      <div className="absolute inset-0 top-14 md:hidden">
        <Foto src={fotoVertical} alt={alt} indicacion="Portada vertical: la barra con la máquina, luz de mañana" oscuro priority />
      </div>
      <div className="absolute inset-0 top-16 hidden md:block">
        <Foto src={fotoHorizontal} alt={alt} indicacion="Portada horizontal: la barra completa, de lado" oscuro />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-noche via-noche/55 to-noche/0"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 md:pb-14">
        <p className="mb-5 flex flex-wrap gap-x-3 gap-y-1 text-[12px] lowercase tracking-etiqueta text-marfil/85">
          <span>café · panadería · pastelería</span>
          <span>todo hecho acá · desde {NEGOCIO.desde}</span>
        </p>

        <h1
          id="titulo-portada"
          className="titulo-portada"
        >
          <span className="block">Hecho</span>
          <span className="block">a mano</span>
          <span className="block text-niebla">en Perito</span>
          <span className="block text-niebla">Moreno</span>
        </h1>

        <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-marfil/90">
            Horneamos todo en el local: medialunas, chipá, scones, tortas y alfajores. El café lo preparamos taza por
            taza.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#menu" className="boton bg-marfil text-noche hover:bg-niebla">
              Ver el menú
            </a>
            <a
              href={LINKS.comoLlegar}
              target="_blank"
              rel="noopener noreferrer"
              className="boton border border-marfil/70 text-marfil hover:bg-marfil/10"
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </div>

      <p className="pie-foto absolute bottom-3 right-4 text-marfil/75 sm:right-6">barra, 8:00 am</p>
    </section>
  );
}
