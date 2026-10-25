"use client";

import { useEffect, useState } from "react";
import { estadoAhora } from "@/lib/horarios";

// Muestra "Abierto ahora" o "Cerrado" en la hora de Perito Moreno. Se recalcula cada minuto.
export default function EstadoAbierto({ claro = false }: { claro?: boolean }) {
  const [estado, setEstado] = useState<ReturnType<typeof estadoAhora> | null>(null);

  useEffect(() => {
    setEstado(estadoAhora());
    const id = setInterval(() => setEstado(estadoAhora()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p aria-live="polite" className={`flex min-h-[1.5rem] items-center gap-2 text-sm font-semibold ${claro ? "text-marfil" : "text-noche"}`}>
      {estado && (
        <>
          <span
            aria-hidden="true"
            className={`inline-block h-2.5 w-2.5 rounded-full ${estado.abierto ? "bg-[#3f8f5a]" : claro ? "bg-marfil/50" : "bg-piedra"}`}
          />
          {estado.texto}
        </>
      )}
    </p>
  );
}
