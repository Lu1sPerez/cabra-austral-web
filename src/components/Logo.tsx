import { CABRA_PATH, CABRA_VIEWBOX, TEXTO_PATHS, TEXTO_VIEWBOX } from "@/lib/logo-paths";

export function Cabra({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={CABRA_VIEWBOX} className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={CABRA_PATH} />
    </svg>
  );
}

export function TextoMarca({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={TEXTO_VIEWBOX} className={className} fill="currentColor" aria-hidden="true" focusable="false">
      {TEXTO_PATHS.map((p, i) => (
        <path key={i} transform={p.transform} d={p.d} />
      ))}
    </svg>
  );
}
