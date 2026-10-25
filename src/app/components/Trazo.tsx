// El sello de la marca: un solo trazo a mano que sube como el vapor del café
// y termina enroscado como el cuerno de la cabra.

export const TRAZO_PATH =
  "M6 124 C46 128 62 86 104 88 S152 132 198 118 S250 58 300 66 S356 132 410 112 S470 40 512 46 C556 52 582 90 566 118 C552 142 516 136 512 110 C508 88 530 76 546 88 C558 98 550 116 536 114 C528 113 526 104 532 100";

export const TRAZO_VIEWBOX = "0 0 600 160";

type Props = {
  className?: string;
  /** Grosor del trazo (en unidades del dibujo) */
  grosor?: number;
  /** Si se pasa, el trazo se dibuja según la variable CSS --p (0 a 1) del contenedor */
  animado?: boolean;
};

export default function Trazo({ className = "", grosor = 5, animado = false }: Props) {
  return (
    <svg viewBox={TRAZO_VIEWBOX} className={className} fill="none" aria-hidden="true" focusable="false">
      <path
        d={TRAZO_PATH}
        pathLength={1}
        stroke="currentColor"
        strokeWidth={grosor}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animado ? "trazo-animado" : undefined}
      />
    </svg>
  );
}
