import type { CSSProperties } from "react";

type Props = { id: string; lineas: string[]; className?: string };

// Título grande de sección. Cada línea sube desde abajo cuando el título entra en pantalla
// (lo activa Reveal.tsx; con "reducir movimiento" aparece quieto).
export default function Titulo({ id, lineas, className = "" }: Props) {
  return (
    <h2 id={id} className={`titulo-seccion reveal-titulo ${className}`}>
      {lineas.map((linea, i) => (
        <span key={linea} className="linea">
          <span style={{ ["--i" as string]: i } as CSSProperties}>
            {linea}
            {i < lineas.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </h2>
  );
}
