import Image from "next/image";

type Props = {
  src: string | null;
  alt: string;
  /** Qué foto va acá. Se muestra en el recuadro mientras la foto no esté subida. */
  indicacion: string;
  /** Proporción, ej. "4 / 5", "3 / 2". Si se omite, ocupa todo el contenedor (para fotos a sangre). */
  proporcion?: string;
  sizes?: string;
  priority?: boolean;
  oscuro?: boolean;
  className?: string;
};

export default function Foto({
  src,
  alt,
  indicacion,
  proporcion,
  sizes = "100vw",
  priority,
  oscuro,
  className = "",
}: Props) {
  const estilo = proporcion ? { aspectRatio: proporcion } : undefined;
  const contenedor = `overflow-hidden ${proporcion ? "relative w-full" : "absolute inset-0"} ${className}`;

  if (src) {
    return (
      <div className={contenedor} style={estilo}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${contenedor} ${oscuro ? "bg-[#2d3a44] text-marfil/80" : "bg-niebla text-pizarra"}`}
      style={estilo}
      role="img"
      aria-label={alt}
    >
      <div className="marcador-trama absolute inset-0" aria-hidden="true" />
      <div className="absolute left-3 top-3 max-w-[85%] text-[11px] leading-snug" aria-hidden="true">
        <span className="font-semibold uppercase tracking-etiqueta">foto {proporcion ? `· ${proporcion.replace(/\s/g, "")}` : ""}</span>
        <br />
        {indicacion}
      </div>
    </div>
  );
}
