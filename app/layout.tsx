import type { Metadata } from "next";
import "./globals.css";

// ACÁ PONEMOS TU DOMINIO REAL
const DOMINIO = "https://www.hacemostuevento.com.ar";

export const metadata: Metadata = {
  // Esta línea es la CLAVE para que WhatsApp encuentre la foto:
  metadataBase: new URL(DOMINIO),

  title: "Panda DJ & Debo Segatti | Hacemos tu Evento",
  description: "Despreocupate, nosotros armamos tu evento. DJs, Sonido, Iluminación y Técnica.",
  
  openGraph: {
    title: "Panda DJ & Debo Segatti",
    description: "Despreocupate, nosotros armamos tu evento.",
    url: DOMINIO,
    siteName: 'Hacemos Tu Evento',
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}