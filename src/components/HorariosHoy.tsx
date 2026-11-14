"use client";

import { useEffect, useState } from "react";
import { filaDeHoy, horariosTexto } from "@/lib/horarios";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

// Tabla de horarios. Marca con "hoy" la fila que corresponde al día de hoy en Perito Moreno.
export default function HorariosHoy({ idioma }: { idioma: Idioma }) {
  const [hoy, setHoy] = useState<number | null>(null);
  useEffect(() => setHoy(filaDeHoy()), []);

  return (
    <dl>
      {horariosTexto(idioma).map((h, i) => (
        <div key={h.dias} className="flex flex-col gap-1 border-b border-borde py-4 last:border-b-0 last:pb-0 lg:flex-row lg:items-baseline lg:justify-between">
          <dt className="flex items-center gap-2 font-semibold">
            {h.dias}
            {hoy === i && (
              <span className="rounded-full bg-pizarra px-2 py-0.5 text-[11px] font-semibold lowercase tracking-etiqueta text-marfil">
                {TEXTOS[idioma].horarios.hoy}
              </span>
            )}
          </dt>
          <dd className={`tabular-nums ${hoy === i ? "text-noche" : "text-piedra"}`}>{h.horas}</dd>
        </div>
      ))}
    </dl>
  );
}
