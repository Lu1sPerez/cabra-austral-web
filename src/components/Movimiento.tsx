"use client";

import { useEffect } from "react";

// Le avisa a los estilos cuánto se scrolleó, para los efectos que acompañan al dedo:
//  --p  en la portada: de 0 a 1 mientras la página sube por encima de la foto.
//  --r  en cada elemento con data-recorrido: de 0 a 1 mientras cruza la pantalla (la marquesina).
// Con "reducir movimiento" activado todo queda quieto.

const limitar = (v: number) => Math.min(1, Math.max(0, v));

export default function Movimiento() {
  useEffect(() => {
    const portada = document.getElementById("inicio");
    const recorridos = Array.from(document.querySelectorAll<HTMLElement>("[data-recorrido]"));
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let ultimoP = "";
    const actualizar = () => {
      frame = 0;
      const alto = window.innerHeight;
      if (reducir.matches) {
        ultimoP = "";
        portada?.style.removeProperty("--p");
        recorridos.forEach((el) => el.style.removeProperty("--r"));
        return;
      }
      const p = limitar(window.scrollY / alto).toFixed(3);
      if (p !== ultimoP) {
        // solo se toca la portada mientras se la ve: una vez tapada no hace falta recalcular nada
        portada?.style.setProperty("--p", p);
        ultimoP = p;
      }
      for (const el of recorridos) {
        const caja = el.getBoundingClientRect();
        if (caja.bottom < -alto * 0.25 || caja.top > alto * 1.25) continue; // lejos de la pantalla
        el.style.setProperty("--r", limitar((alto - caja.top) / (alto + caja.height)).toFixed(4));
      }
    };
    const pedir = () => {
      if (!frame) frame = requestAnimationFrame(actualizar);
    };

    actualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    reducir.addEventListener("change", pedir);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      reducir.removeEventListener("change", pedir);
    };
  }, []);

  return null;
}
