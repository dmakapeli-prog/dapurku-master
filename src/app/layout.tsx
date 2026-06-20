import { Outfit, Chewy } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const chewy = Chewy({
  weight: "400",
  variable: "--font-chewy",
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DapurKu | Sajian Khas Autentik Gunung Walat",
  description: "Nikmati aneka hidangan lezat, dimsum premium, seblak jadul, dan minuman segar di DapurKu Gunung Walat. Pesan online cepat via WhatsApp.",
  keywords: ["dapurku", "kuliner gunung walat", "dimsum premium", "seblak jadul", "pesan antar makanan"],
  authors: [{ name: "RevTech" }],
  openGraph: {
    title: "DapurKu | Sajian Khas Autentik Gunung Walat",
    description: "Nikmati aneka hidangan lezat, dimsum premium, seblak jadul, dan minuman segar di DapurKu Gunung Walat.",
    url: "https://dapurku-rho.vercel.app",
    siteName: "DapurKu",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${outfit.variable} ${chewy.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans text-stone-800 bg-stone-50">{children}</body>
    </html>
  );
}
