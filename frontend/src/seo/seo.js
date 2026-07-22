export const defaultSeo = {
  title: 'Habtamu Batteries - Premium Car Batteries & Accessories',
  description:
    'Habtamu Batteries offers premium car batteries (35Ah-200Ah), trade-ins, accessories, acid, maintenance and repairs. Trusted battery shop in Ethiopia.',
  keywords: 'car batteries Ethiopia, battery trade-in, battery accessories, Habtamu Batteries',
  image: '/og-image.svg',
  url: typeof window !== 'undefined' ? window.location.origin : '',
};

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: 'Habtamu Batteries',
  image: '/og-image.svg',
  description:
    'Car battery shop selling new batteries (35Ah-200Ah), trade-ins, accessories, acid, maintenance services.',
  telephone: '+251-911-000000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bole Road',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  url: typeof window !== 'undefined' ? window.location.origin : '',
  priceRange: '$$',
  openingHours: 'Mo-Sa 08:00-19:00',
};
