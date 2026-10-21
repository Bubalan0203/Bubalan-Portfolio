import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bubalan S — Associate Product Engineer',
    short_name: 'Bubalan S',
    description: 'Healthcare products built end to end at Predigle.',
    start_url: '/',
    display: 'standalone',
    background_color: '#02060B',
    theme_color: '#02060B',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
