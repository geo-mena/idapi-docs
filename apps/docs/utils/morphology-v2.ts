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
    event?: Array<{
      listen: string;
      script: {
        exec: string[];
        type: string;
      };
    }>;
  }>;
}

export const SUPPORTED_MORPHOLOGY_V2_SERVICES = {
  '/docs/services/morphology-v2': 'documentValidationWorkflowV2',
} as const;

export function isSupportedMorphologyV2Service(pathname: string): boolean {
  return Object.keys(SUPPORTED_MORPHOLOGY_V2_SERVICES).some(service =>
    pathname === service
  );
}

export function getCurrentMorphologyV2Service(pathname: string): string | null {
  const service = Object.keys(SUPPORTED_MORPHOLOGY_V2_SERVICES).find(service =>
    pathname === service
  );
  return service ? SUPPORTED_MORPHOLOGY_V2_SERVICES[service as keyof typeof SUPPORTED_MORPHOLOGY_V2_SERVICES] : null;
}

export function generateDocumentValidationWorkflowV2Collection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Document Validation Workflow V2",
      description: "Complete workflow for morphological validation of identity documents V2. This collection includes the 3-step process: Start (send document info), Status (poll until completion), and Data (retrieve results).",
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
        key: "country",
        value: "{{COUNTRY_CODE}}",
        type: "string"
      },
      {
        key: "idType",
        value: "{{ID_TYPE}}",
        type: "string"
      },
      {
        key: "documentFrontRawImage",
        value: "{{DOCUMENT_FRONT_RAW_IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "documentBackRawImage",
        value: "{{DOCUMENT_BACK_RAW_IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "merchantIdScanReference",
        value: "{{MERCHANT_ID_SCAN_REFERENCE}}",
        type: "string"
      },
      {
        key: "documentRawImageMimeType",
        value: "{{DOCUMENT_RAW_IMAGE_MIME_TYPE}}",
        type: "string"
      },
      {
        key: "scanReference",
        value: "{{SCAN_REFERENCE}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "1. Document Validation Start V2",
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
              country: "{{country}}",
              idType: "{{idType}}",
              documentFrontRawImage: "{{documentFrontRawImage}}",
              documentBackRawImage: "{{documentBackRawImage}}",
              merchantIdScanReference: "{{merchantIdScanReference}}",
              documentRawImageMimeType: "{{documentRawImageMimeType}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/verify/documentValidation/v2/start",
            host: ["{{baseUrl}}"],
            path: ["verify", "documentValidation", "v2", "start"]
          },
          description: "Step 1: Start the morphological validation process V2 by sending document images, country and type. Use the scanReference from the response for the next steps."
        },
        event: [
          {
            listen: "test",
            script: {
              exec: [
                "// Test for successful response",
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "// Extract scanReference from response and set as collection variable",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    if (responseJson.scanReference) {",
                "        pm.collectionVariables.set('scanReference', responseJson.scanReference);",
                "        console.log('scanReference saved:', responseJson.scanReference);",
                "    }",
                "    if (responseJson.type) {",
                "        pm.collectionVariables.set('type', responseJson.type);",
                "        console.log('type saved:', responseJson.type);",
                "    }",
                "}"
              ],
              type: "text/javascript"
            }
          }
        ]
      },
      {
        name: "2. Document Validation Status V2",
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
              scanReference: "{{scanReference}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/verify/documentValidation/v2/status",
            host: ["{{baseUrl}}"],
            path: ["verify", "documentValidation", "v2", "status"]
          },
          description: "Step 2: Check validation status V2. Poll this endpoint every 5 seconds until status is 'DONE' or 'FAILED'. Use scanReference from Step 1."
        },
        event: [
          {
            listen: "prerequest",
            script: {
              exec: [
                "// Get scanReference from collection variables (set by Step 1)",
                "const savedScanReference = pm.collectionVariables.get('scanReference');",
                "",
                "if (savedScanReference) {",
                "    pm.variables.set('scanReference', savedScanReference);",
                "    console.log('Using scanReference from Step 1:', savedScanReference);",
                "}"
              ],
              type: "text/javascript"
            }
          },
          {
            listen: "test",
            script: {
              exec: [
                "// Test for successful response",
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "// Check validation status and handle polling",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    const status = responseJson.status;",
                "    ",
                "    pm.test('Status is available', function () {",
                "        pm.expect(status).to.be.oneOf(['PENDING', 'DONE', 'FAILED']);",
                "    });",
                "    ",
                "    console.log('Current status:', status);",
                "    ",
                "    if (status === 'PENDING') {",
                "        console.log('Status is PENDING, retrying in 5 seconds...');",
                "        ",
                "        // Set a retry counter to avoid infinite loops",
                "        let retryCount = pm.collectionVariables.get('statusRetryCount') || 0;",
                "        retryCount++;",
                "        pm.collectionVariables.set('statusRetryCount', retryCount);",
                "        ",
                "        if (retryCount < 36) { // Max 36 retries = 3 minutes",
                "            setTimeout(() => {",
                "                console.log(`Retry attempt ${retryCount}/36 - Checking status again...`);",
                "                pm.sendRequest(pm.request, (err, response) => {",
                "                    if (err) {",
                "                        console.error('Retry request failed:', err);",
                "                        pm.test('Retry request failed', () => {",
                "                            pm.expect.fail('Failed to retry status check');",
                "                        });",
                "                    }",
                "                });",
                "            }, 5000);",
                "        } else {",
                "            console.error('Maximum retry attempts reached (3 minutes). Stopping.');",
                "            pm.test('Status check timeout', () => {",
                "                pm.expect.fail('Status remained PENDING for too long (3 minutes)');",
                "            });",
                "        }",
                "    } else if (status === 'DONE') {",
                "        console.log('✅ Status is DONE, ready to get data!');",
                "        pm.collectionVariables.unset('statusRetryCount'); // Clear retry counter",
                "        pm.test('Validation completed successfully', function () {",
                "            pm.expect(status).to.eql('DONE');",
                "        });",
                "    } else if (status === 'FAILED') {",
                "        console.log('❌ Status is FAILED, validation encountered an error');",
                "        pm.collectionVariables.unset('statusRetryCount'); // Clear retry counter",
                "        pm.test('Validation failed', function () {",
                "            pm.expect(status).to.eql('FAILED');",
                "        });",
                "    }",
                "}"
              ],
              type: "text/javascript"
            }
          }
        ]
      },
      {
        name: "3. Document Validation Data V2",
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
              scanReference: "{{scanReference}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/verify/documentValidation/v2/data",
            host: ["{{baseUrl}}"],
            path: ["verify", "documentValidation", "v2", "data"]
          },
          description: "Step 3: Retrieve validation results V2 once status is 'DONE'. Returns document data, verification status, and analysis results."
        },
        event: [
          {
            listen: "prerequest",
            script: {
              exec: [
                "// Get scanReference from collection variables (set by Step 1)",
                "const savedScanReference = pm.collectionVariables.get('scanReference');",
                "",
                "if (savedScanReference) {",
                "    pm.variables.set('scanReference', savedScanReference);",
                "    console.log('Using scanReference for data retrieval:', savedScanReference);",
                "}"
              ],
              type: "text/javascript"
            }
          },
          {
            listen: "test",
            script: {
              exec: [
                "// Test for successful response",
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "// Validate response structure and verification data",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    ",
                "    pm.test('Response contains verification data', function () {",
                "        pm.expect(responseJson).to.have.property('verification');",
                "    });",
                "    ",
                "    if (responseJson.verification && responseJson.verification.status) {",
                "        const docStatus = responseJson.verification.status;",
                "        console.log('Document validation status:', docStatus);",
                "        ",
                "        pm.test('Document status is valid', function () {",
                "            pm.expect(docStatus).to.be.oneOf([",
                "                'Started', ",
                "                'Submitted', ",
                "                'Approved', ",
                "                'Declined', ",
                "                'Resubmission', ",
                "                'Expired/Abandoned', ",
                "                'Review'",
                "            ]);",
                "        });",
                "        ",
                "        if (docStatus === 'Approved') {",
                "            console.log('✅ Document validation successful!');",
                "        } else {",
                "            console.log('❌ Document validation status:', docStatus);",
                "        }",
                "    }",
                "    ",
                "    if (responseJson.verification && responseJson.verification.code) {",
                "        console.log('Verification code:', responseJson.verification.code);",
                "        ",
                "        pm.test('Verification code is valid', function () {",
                "            pm.expect(responseJson.verification.code).to.be.oneOf([",
                "                7001, 7002, 9001, 9102, 9103, 9104, 9121",
                "            ]);",
                "        });",
                "    }",
                "    ",
                "    if (responseJson.status) {",
                "        console.log('Service status:', responseJson.status);",
                "    }",
                "}"
              ],
              type: "text/javascript"
            }
          }
        ]
      }
    ]
  };
}

export function generateMorphologyV2PostmanCollection(serviceName: string): PostmanCollection | null {
  switch (serviceName) {
    case 'documentValidationWorkflowV2':
      return generateDocumentValidationWorkflowV2Collection();
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