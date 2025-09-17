export interface PostmanCollection {
  info: {
    name: string;
    description: string;
    schema: string;
  };
  variable: Array<{
    key: string;
    value: string;
    type: string;
  }>;
  item: Array<{
    name: string;
    request: {
      method: string;
      header: Array<{
        key: string;
        value: string;
        type: string;
      }>;
      body: {
        mode: string;
        raw?: string;
        file?: {
          src: string;
        };
      };
      url: {
        raw: string;
        host: string[];
        path: string[];
      };
      description: string;
    };
  }>;
}

export const SUPPORTED_IAD_SERVICES = {
  '/docs/services/security/injectionAttackDetection': 'injectionAttackDetection',
} as const;

export function isSupportedIADService(pathname: string): boolean {
  return Object.keys(SUPPORTED_IAD_SERVICES).some(service =>
    pathname === service
  );
}

export function getCurrentIADService(pathname: string): string | null {
  const service = Object.keys(SUPPORTED_IAD_SERVICES).find(service =>
    pathname === service
  );
  return service ? SUPPORTED_IAD_SERVICES[service as keyof typeof SUPPORTED_IAD_SERVICES] : null;
}

export function generateInjectionAttackDetectionCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Injection Attack Detection (IAD)",
      description: "Collection for Injection Attack Detection services. Analyzes encrypted bundles from IAD capture libraries to detect attack vectors (virtual cameras, external devices, browser attacks) and attack content (3D rendering, face morphing, face swap, deep fake).",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    variable: [
      {
        key: "baseUrl",
        value: "{{IDENTITY_API_BASE_URL}}",
        type: "string"
      },
      {
        key: "apiKey",
        value: "{{API_KEY}}",
        type: "string"
      },
      {
        key: "iadBundle",
        value: "{{IAD_BUNDLE_FILE_PATH}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "Injection Attack Detection",
        request: {
          method: "POST",
          header: [
            {
              key: "x-api-key",
              value: "{{apiKey}}",
              type: "text"
            },
            {
              key: "Content-Type",
              value: "application/octet-stream",
              type: "text"
            }
          ],
          body: {
            mode: "file",
            file: {
              src: "{{iadBundle}}"
            }
          },
          url: {
            raw: "{{baseUrl}}/iad",
            host: ["{{baseUrl}}"],
            path: ["iad"]
          },
          description: "Injection and presentation attack detection service. Analyzes encrypted bundles from IAD capture libraries to detect various attack vectors and content manipulations. Requires client-side integration of IAD capture libraries (included in Selphi™)."
        }
      }
    ]
  };
}

export function generateIADPostmanCollection(serviceName: string): PostmanCollection | null {
  switch (serviceName) {
    case 'injectionAttackDetection':
      return generateInjectionAttackDetectionCollection();
    default:
      return null;
  }
}

export function downloadPostmanCollection(collection: PostmanCollection, filename?: string): void {
  const blob = new Blob([JSON.stringify(collection, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `${collection.info.name.replace(/\s+/g, '_')}.postman_collection.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}