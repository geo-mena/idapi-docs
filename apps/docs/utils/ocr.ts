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

export const SUPPORTED_SERVICES = {
  '/docs/services/ocr/extractDocumentDataWeb': 'extractDocumentDataWeb',
  '/docs/services/ocr/extractDocumentData': 'extractDocumentData',
} as const;

export function isSupportedService(pathname: string): boolean {
  return Object.keys(SUPPORTED_SERVICES).some(service =>
    pathname.includes(service)
  );
}

export function getCurrentService(pathname: string): string | null {
  const service = Object.keys(SUPPORTED_SERVICES).find(service =>
    pathname.includes(service)
  );
  return service ? SUPPORTED_SERVICES[service as keyof typeof SUPPORTED_SERVICES] : null;
}

export function generateExtractDocumentDataWebCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Extract Document Data Web",
      description: "This service returns all the data extracted from an identification document by applying OCR to MRZ code, PDF, Barcode, and visible fields in other areas of the document according to the model defined for each country. For passports, OCR is exclusively applied to the MRZ code due to its standardized format.",
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
        key: "tokenFrontDocument",
        value: "{{TOKEN_FRONT_DOCUMENT}}",
        type: "string"
      },
      {
        key: "tokenBackDocument",
        value: "{{TOKEN_BACK_DOCUMENT}}",
        type: "string"
      },
      {
        key: "countryCode",
        value: "{{COUNTRY_CODE}}",
        type: "string"
      },
      {
        key: "extraData",
        value: "{{EXTRA_DATA}}",
        type: "string"
      },
      {
        key: "operationId",
        value: "{{OPERATION_ID}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "Extract Document Data Web",
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
              tokenFrontDocument: "{{tokenFrontDocument}}",
              tokenBackDocument: "{{tokenBackDocument}}",
              countryCode: "{{countryCode}}",
              decompose: false,
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/extractDocumentDataWeb",
            host: ["{{baseUrl}}"],
            path: ["services", "extractDocumentDataWeb"]
          },
          description: "Extract all data from identification documents using OCR. This service is used for implementations of the SelphID Web Widget or for sending open images from any platform."
        }
      }
    ]
  };
}

export function generateExtractDocumentDataCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Extract Document Data",
      description: "This service returns all the data extracted from an identification document by applying OCR to MRZ code, PDF, Barcode, and visible fields in other areas of the document according to the model defined for each country.",
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
        key: "tokenOcr",
        value: "{{TOKEN_OCR}}",
        type: "string"
      },
      {
        key: "extraData",
        value: "{{EXTRA_DATA}}",
        type: "string"
      },
      {
        key: "operationId",
        value: "{{OPERATION_ID}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "Extract Document Data",
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
              tokenOcr: "{{tokenOcr}}",
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/extractDocumentData",
            host: ["{{baseUrl}}"],
            path: ["services", "extractDocumentData"]
          },
          description: "Extract all data from identification documents using OCR. This service is used for implementations of the SelphID Mobile Widget by sending the TokenOCR property generated from the widget's native function."
        }
      }
    ]
  };
}

export function generatePostmanCollection(serviceName: string): PostmanCollection | null {
  switch (serviceName) {
    case 'extractDocumentDataWeb':
      return generateExtractDocumentDataWebCollection();
    case 'extractDocumentData':
      return generateExtractDocumentDataCollection();
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