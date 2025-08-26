import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: ['./scalar.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const geocodingapi = createOpenAPI({
  input: ['./geocoding.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const servicesapi = createOpenAPI({
  input: ['./services.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const onboardingapi = createOpenAPI({
  input: ['./content/docs/services/onboarding.yml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const authenticationapi = createOpenAPI({
  input: ['./content/docs/services/authentication.yml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const ocrapi = createOpenAPI({
  input: ['./content/docs/services/ocr.yml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const morphologyapi = createOpenAPI({
  input: ['./content/docs/services/morphology.yml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const civilvalidationecapi = createOpenAPI({
  input: [
    './content/docs/services/civil-validation-ec/full-mobile.yml',
    './content/docs/services/civil-validation-ec/full-web.yml',
    './content/docs/services/civil-validation-ec/data-mobile.yml',
    './content/docs/services/civil-validation-ec/data-web.yml',
    './content/docs/services/civil-validation-ec/facial-mobile.yml',
    './content/docs/services/civil-validation-ec/facial-web.yml'
  ],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});
