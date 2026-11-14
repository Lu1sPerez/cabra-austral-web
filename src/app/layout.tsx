import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import { URL_SITIO } from "@/lib/negocio";
import { LANG_HTML, type Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

// Titulares: Roboto Serif condensada (la más parecida a la letra del logo).
// Texto: Manrope, la misma del sistema interno. Ambas se sirven desde la propia web.
const display = localFont({
  src: "./fonts/roboto-serif-condensed-800.woff",
  weight: "800",
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/manrope-variable.woff",
  weight: "200 800",
  variable: "--font-sans",
  display: "swap",
});

// El título y la descripción de cada idioma están en src/i18n/metadata.ts (los usa cada página).
export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: TEXTOS.es.meta.titulo,
  description: TEXTOS.es.meta.descripcion,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F0EEE9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // src/middleware.ts avisa en qué idioma está la página ("/" castellano, "/en" inglés)
  const idioma: Idioma = headers().get("x-idioma") === "en" ? "en" : "es";
  return (
    <html lang={LANG_HTML[idioma]} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que hay JavaScript y, si ya vio la entrada en esta visita (o llega a una sección con #), la saltea */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('intro')||location.hash){d.classList.add('sin-intro')}sessionStorage.setItem('intro','1')}catch(e){}})()",
          }}
        />
      </head>
      <body className="bg-marfil font-sans text-noche antialiased">
        <a href="#contenido" className="saltar">
          {TEXTOS[idioma].saltar}
        </a>
        {children}
      </body>
    </html>
  );
}
