import type { CSSProperties } from "react";
import type { Dibujo as TipoDibujo } from "@/data/dibujos";

type Props = {
  dibujo: TipoDibujo;
  className?: string;
  style?: CSSProperties;
};

// Un dibujo de la carta. Cada trazo tiene pathLength=1 para poder "dibujarlo" con CSS
// (variables --trazo y --relleno, ver .dibujo en globals.css).
export default function Dibujo({ dibujo, className = "", style }: Props) {
  return (
    <svg
      viewBox={dibujo.viewBox}
      className={`dibujo ${className}`}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {dibujo.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.regla} pathLength={1} />
      ))}
    </svg>
  );
}
