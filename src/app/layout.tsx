import type { Metadata, Viewport } from "next";
import { Inter, Archivo, Noto_Serif_JP } from "next/font/google";
import { AuthProvider } from "@/lib/firebase/auth-context";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const notoSerifJP = Noto_Serif_JP({
  weight: ["500", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-jp",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d4232a",
};

export const metadata: Metadata = {
  applicationName: "OPAM KARATE",
  category: "sports",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "OPAM KARATE - Tradição, Disciplina e Excelência",
    description: "Academia de Karate Shorin Ryu, afiliada à SHINSHUKAN, com mais de 25 anos de tradição.",
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
    "image": "https://opamkarate.com/opengraph-image",
    "logo": "https://opamkarate.com/icon",
    "areaServed": "São Paulo, SP",
    "founder": { "@type": "Person", "name": "Sensei Bruno Garcia" },
    "foundingDate": "1999",
    "knowsAbout": ["Karate Shorin Ryu", "Karate-Do", "Defesa pessoal"],
    "contactPoint": { "@type": "ContactPoint", "telephone": "+55 11 96939-2260", "contactType": "customer service", "availableLanguage": "Portuguese" },
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
    <html lang="pt-BR" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} ${archivo.variable} ${notoSerifJP.variable} antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          <SmoothScroll />
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
