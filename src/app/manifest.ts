import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OPAM KARATE - Academia de Karate Shorin Ryu',
    short_name: 'OPAM KARATE',
    description: 'Academia de Karate Shorin Ryu, afiliada à SHINSHUKAN, com mais de 25 anos de tradição em Itaquera, São Paulo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#dc2626',
    icons: [
      {
        src: '/opam-logo.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  }
}
