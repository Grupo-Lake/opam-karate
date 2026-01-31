import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OPAM KARATE - Tradição, Disciplina e Excelência",
    template: "%s | OPAM KARATE"
  },
  description: "Academia de Karate Shorin Ryu, afiliada à SHINSHUKAN, com mais de 25 anos de tradição em Itaquera, São Paulo. Turmas para todas as idades. Venha conhecer o OPAM KARATE!",
  keywords: [
    "karate",
    "karate shorin ryu",
    "shorin-ryu",
    "artes marciais",
    "defesa pessoal",
    "academia karate",
    "shinshukan",
    "karate itaquera",
    "dojo",
    "karate sao paulo",
    "aulas de karate",
    "karate infantil",
    "karate adulto",
    "faixa preta",
    "sensei bruno garcia"
  ],
  authors: [{ name: "OPAM KARATE" }],
  creator: "OPAM KARATE",
  publisher: "OPAM KARATE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://opamkarate.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OPAM KARATE - Tradição, Disciplina e Excelência",
    description: "Academia de Karate Shorin Ryu, afiliada à SHINSHUKAN, com mais de 25 anos de tradição. Turmas para todas as idades em Itaquera, São Paulo.",
    url: "https://opamkarate.com",
    siteName: "OPAM KARATE",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opam-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "OPAM KARATE - Academia de Karate Shorin Ryu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPAM KARATE - Tradição, Disciplina e Excelência",
    description: "Academia de Karate Shorin Ryu, afiliada à SHINSHUKAN, com mais de 25 anos de tradição.",
    images: ["/opam-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/opam-logo.jpeg" },
      { url: "/opam-logo.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/opam-logo.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: [
      { url: "/opam-logo.jpeg" },
    ],
    shortcut: ["/opam-logo.jpeg"],
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "OPAM KARATE",
    "image": "https://opamkarate.com/opam-logo.jpeg",
    "description": "Academia de Karate Shorin Ryu, afiliada à SHINSHUKAN, com mais de 25 anos de tradição em Itaquera, São Paulo.",
    "@id": "https://opamkarate.com",
    "url": "https://opamkarate.com",
    "telephone": "+55 11 96939-2260",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Sabbado D'Ângelo, 1369",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "08215-545",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.5407,
      "longitude": -46.4564
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday"],
        "opens": "20:00",
        "closes": "21:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Wednesday"],
        "opens": "20:00",
        "closes": "21:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/opamkarate/",
      "https://web.facebook.com/karatenindoryu",
      "https://www.youtube.com/@senseibrunoopam8388",
      "https://shinshukan.com.br/",
      "https://itaquera.net.br/sobre/opam-nin-do-ryu-karate"
    ],
    "sport": "Martial Arts",
    "priceRange": "$$"
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SmoothScroll />
        <Header />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
