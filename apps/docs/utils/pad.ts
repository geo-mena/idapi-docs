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
        raw: string;
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

export const SUPPORTED_PAD_SERVICES = {
  '/docs/services/pad/documentPadDiagnostic': 'documentPadDiagnostic',
} as const;

export function isSupportedPADService(pathname: string): boolean {
  return Object.keys(SUPPORTED_PAD_SERVICES).some(service =>
    pathname === service
  );
}

export function getCurrentPADService(pathname: string): string | null {
  const service = Object.keys(SUPPORTED_PAD_SERVICES).find(service =>
    pathname === service
  );
  return service ? SUPPORTED_PAD_SERVICES[service as keyof typeof SUPPORTED_PAD_SERVICES] : null;
}

export function generateDocumentPadDiagnosticCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Document PAD Diagnostic",
      description: "Document Pad Diagnostic service for checking if the support of an identity document is genuine or not, detecting presentation attacks aimed at identity theft. Results: Credible (genuine), Doubtful (uncertain), Spoof (not genuine), Error (validation error).",
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
        key: "frontSideImage",
        value: "{{FRONT_SIDE_IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "backSideImage",
        value: "{{BACK_SIDE_IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "face",
        value: "{{FACE_IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "countryCode",
        value: "{{COUNTRY_CODE}}",
        type: "string"
      },
      {
        key: "idType",
        value: "{{ID_TYPE}}",
        type: "string"
      },
      {
        key: "tokenized",
        value: "{{TOKENIZED}}",
        type: "boolean"
      }
    ],
    item: [
      {
        name: "Document PAD Diagnostic",
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
              value: "application/json",
              type: "text"
            }
          ],
          body: {
            mode: "raw",
            raw: JSON.stringify({
              frontSideImage: "{{frontSideImage}}",
              backSideImage: "{{backSideImage}}",
              face: "{{face}}",
              tokenized: "{{tokenized}}",
              countryCode: "{{countryCode}}",
              idType: "{{idType}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/verify/pad/diagnostic",
            host: ["{{baseUrl}}"],
            path: ["verify", "pad", "diagnostic"]
          },
          description: "Service that checks if the support of an identity document is genuine or not by verifying its image, to detect presentation attacks aimed at identity theft. Returns decision: Credible, Doubtful, Spoof, or Error."
        }
      }
    ]
  };
}

export function generatePADPostmanCollection(serviceName: string): PostmanCollection | null {
  switch (serviceName) {
    case 'documentPadDiagnostic':
      return generateDocumentPadDiagnosticCollection();
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