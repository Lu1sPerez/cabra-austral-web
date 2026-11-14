"use client";

import { useEffect } from "react";

// Aparición suave de los bloques con clase "reveal" al entrar en pantalla,
// y de los títulos de sección (clase "reveal-titulo"), que suben línea por línea.
// Sin JavaScript o con "reducir movimiento", todo se ve desde el principio (ver globals.css).
export default function Reveal() {
  useEffect(() => {
    const elementos = document.querySelectorAll<HTMLElement>(".reveal, .reveal-titulo");
    if (!("IntersectionObserver" in window)) {
      elementos.forEach((el) => (el.dataset.visible = "true"));
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "true";
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    elementos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
