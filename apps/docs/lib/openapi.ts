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
  input: ['./content/docs/services/onboarding.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const authenticationapi = createOpenAPI({
  input: ['./content/docs/services/authentication.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const ocrapi = createOpenAPI({
  input: ['./content/docs/services/ocr.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const morphologyapi = createOpenAPI({
  input: ['./content/docs/services/morphology/morphology.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const morphologyv2api = createOpenAPI({
  input: ['./content/docs/services/morphology-v2/morphology-v2.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const padapi = createOpenAPI({
  input: ['./content/docs/services/pad/pad-diagnostic.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const iadapi = createOpenAPI({
  input: ['./content/docs/services/security/iad.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const trackingapi = createOpenAPI({
  input: ['./content/docs/services/tracking/finish-tracking.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const detokenizeapi = createOpenAPI({
  input: ['./content/docs/services/detokenize/detokenize.yaml'],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const previredapi = createOpenAPI({
  input: ['./content/docs/services/previred/previred.yaml'],
  
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
    './content/docs/services/civil-validation-ec/full-mobile.yaml',
    './content/docs/services/civil-validation-ec/full-web.yaml',
    './content/docs/services/civil-validation-ec/data-mobile.yaml',
    './content/docs/services/civil-validation-ec/data-web.yaml',
    './content/docs/services/civil-validation-ec/facial-mobile.yaml',
    './content/docs/services/civil-validation-ec/facial-web.yaml'
  ],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export const civilvalidationcrapi = createOpenAPI({
  input: [
    './content/docs/services/civil-validation-cr/full-mobile.yaml',
    './content/docs/services/civil-validation-cr/full-web.yaml',
    './content/docs/services/civil-validation-cr/data-mobile.yaml',
    './content/docs/services/civil-validation-cr/data-web.yaml',
    './content/docs/services/civil-validation-cr/facial-mobile.yaml',
    './content/docs/services/civil-validation-cr/facial-web.yaml'
  ],

  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});
