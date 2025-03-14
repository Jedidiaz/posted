import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers/Providers";
import { generatePageMetadata } from "@/utils/metadata";

const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const generateMetadata = (): Metadata =>
  generatePageMetadata({
    title: "Posted",
    description:
      "Explora y descubre una variedad de publicaciones de diferentes usuarios. Mantente al día con el contenido más reciente y participa en la comunidad.",
  });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased text-gray-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
