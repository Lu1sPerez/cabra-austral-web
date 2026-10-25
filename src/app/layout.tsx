import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { URL_SITIO } from "@/lib/negocio";

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

const titulo = "Cabra Austral · Café, panadería y pastelería artesanal en Perito Moreno";
const descripcion =
  "Cafetería en Perito Moreno, Santa Cruz. Medialunas, chipá, scones, tortas y alfajores hechos en el local, café, té en hebras y mates. 9 de Julio 1453.";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Cabra Austral",
    title: titulo,
    description: descripcion,
  },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F0EEE9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
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
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
