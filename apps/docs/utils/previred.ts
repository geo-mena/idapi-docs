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

export const SUPPORTED_PREVIRED_SERVICES = {
  '/docs/services/previred': 'previredWorkflow',
} as const;

export function isSupportedPreviredService(pathname: string): boolean {
  return Object.keys(SUPPORTED_PREVIRED_SERVICES).some(service =>
    pathname === service
  );
}

export function getCurrentPreviredService(pathname: string): string | null {
  const service = Object.keys(SUPPORTED_PREVIRED_SERVICES).find(service =>
    pathname === service
  );
  return service ? SUPPORTED_PREVIRED_SERVICES[service as keyof typeof SUPPORTED_PREVIRED_SERVICES] : null;
}

export function generatePreviredWorkflowCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Previred Integration Workflow",
      description: "Complete 6-step workflow for Previred integration in Chile. Includes document validation, identity verification, status checking, data extraction, Previred processing, and token retrieval.",
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
        value: "CHL",
        type: "string"
      },
      {
        key: "idType",
        value: "ID_CARD",
        type: "string"
      },
      {
        key: "documentFrontRawImage",
        value: "{{FRONTSIDE_IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "documentBackRawImage",
        value: "{{BACKSIDE_IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "merchantIdScanReference",
        value: "{{MERCHANT_ID_SCAN_REFERENCE}}",
        type: "string"
      },
      {
        key: "token1",
        value: "{{DOCUMENT_PHOTO_BASE64}}",
        type: "string"
      },
      {
        key: "bestImageToken",
        value: "{{SELPHI_BEST_IMAGE_TOKEN}}",
        type: "string"
      },
      {
        key: "customerId",
        value: "{{CUSTOMER_ID}}",
        type: "string"
      },
      {
        key: "ipVerified",
        value: "{{IP_VERIFIED}}",
        type: "string"
      },
      {
        key: "callbackUrl",
        value: "{{CALLBACK_URL}}",
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
      },
      {
        key: "scanReference",
        value: "",
        type: "string"
      },
      {
        key: "type",
        value: "",
        type: "string"
      },
      {
        key: "serviceTransactionId",
        value: "",
        type: "string"
      },
      {
        key: "transactionId",
        value: "",
        type: "string"
      }
    ],
    item: [
      {
        name: "1. Start Document Validation",
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
              documentRawImageMimeType: "image/jpeg",
              documentFrontRawImage: "{{documentFrontRawImage}}",
              documentBackRawImage: "{{documentBackRawImage}}",
              merchantIdScanReference: "{{merchantIdScanReference}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/verify/documentValidation/v2/start",
            host: ["{{baseUrl}}"],
            path: ["verify", "documentValidation", "v2", "start"]
          },
          description: "Step 1: Start document validation by sending document images. Extract scanReference and type for next steps."
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
                "// Extract scanReference and type from response",
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
        name: "2. Identity Validation V2",
        request: {
          method: "POST",
          header: [
            {
              key: "x-api-key",
              value: "{{apiKey}}",
              type: "text"
            },
            {
              key: "family",
              value: "OnBoarding",
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
              token1: "{{token1}}",
              bestImageToken: "{{bestImageToken}}",
              method: "3",
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/onboarding/v2/identity",
            host: ["{{baseUrl}}"],
            path: ["onboarding", "v2", "identity"]
          },
          description: "Step 2: Perform biometric identity validation. Extract serviceTransactionId for Previred step."
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
                "// Extract serviceTransactionId from response",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    if (responseJson.serviceTransactionId) {",
                "        pm.collectionVariables.set('serviceTransactionId', responseJson.serviceTransactionId);",
                "        console.log('serviceTransactionId saved:', responseJson.serviceTransactionId);",
                "    }",
                "    ",
                "    // Validate biometric results",
                "    pm.test('Face authentication result is positive', function () {",
                "        pm.expect(responseJson.facialAuthenticationResult).to.eql(3);",
                "    });",
                "    ",
                "    pm.test('Liveness detection is positive', function () {",
                "        pm.expect(responseJson.passiveLivenessResult).to.eql(3);",
                "    });",
                "}"
              ],
              type: "text/javascript"
            }
          }
        ]
      },
      {
        name: "3. Check Document Validation Status",
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
              scanReference: "{{scanReference}}",
              type: "{{type}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/verify/documentValidation/v2/status",
            host: ["{{baseUrl}}"],
            path: ["verify", "documentValidation", "v2", "status"]
          },
          description: "Step 3: Check document validation status. Must be DONE before proceeding to data extraction."
        },
        event: [
          {
            listen: "prerequest",
            script: {
              exec: [
                "// Get scanReference and type from collection variables",
                "const savedScanReference = pm.collectionVariables.get('scanReference');",
                "const savedType = pm.collectionVariables.get('type');",
                "",
                "if (savedScanReference) {",
                "    pm.variables.set('scanReference', savedScanReference);",
                "    console.log('Using scanReference from Step 1:', savedScanReference);",
                "}",
                "",
                "if (savedType) {",
                "    pm.variables.set('type', savedType);",
                "    console.log('Using type from Step 1:', savedType);",
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
                "// Validate status is DONE",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    const status = responseJson.status;",
                "    ",
                "    pm.test('Status is DONE', function () {",
                "        pm.expect(status).to.eql('DONE');",
                "    });",
                "    ",
                "    if (status === 'DONE') {",
                "        console.log('Document validation status is DONE, ready to get data!');",
                "    } else {",
                "        console.log('Document validation status is not DONE:', status);",
                "    }",
                "}"
              ],
              type: "text/javascript"
            }
          }
        ]
      },
      {
        name: "4. Get Document Validation Data",
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
              scanReference: "{{scanReference}}",
              type: "{{type}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/verify/documentValidation/v2/data",
            host: ["{{baseUrl}}"],
            path: ["verify", "documentValidation", "v2", "data"]
          },
          description: "Step 4: Extract validated document data including personal information and document details."
        },
        event: [
          {
            listen: "prerequest",
            script: {
              exec: [
                "// Get scanReference and type from collection variables",
                "const savedScanReference = pm.collectionVariables.get('scanReference');",
                "const savedType = pm.collectionVariables.get('type');",
                "",
                "if (savedScanReference) {",
                "    pm.variables.set('scanReference', savedScanReference);",
                "    console.log('Using scanReference for data retrieval:', savedScanReference);",
                "}",
                "",
                "if (savedType) {",
                "    pm.variables.set('type', savedType);",
                "    console.log('Using type for data retrieval:', savedType);",
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
                "// Validate response structure",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    ",
                "    pm.test('Response contains document data', function () {",
                "        pm.expect(responseJson).to.have.property('document');",
                "    });",
                "    ",
                "    pm.test('Response contains transaction data', function () {",
                "        pm.expect(responseJson).to.have.property('transaction');",
                "    });",
                "    ",
                "    if (responseJson.document && responseJson.document.status) {",
                "        const docStatus = responseJson.document.status;",
                "        console.log('Document validation status:', docStatus);",
                "        ",
                "        if (docStatus === 'APPROVED_VERIFIED') {",
                "            console.log('Document validation successful!');",
                "        } else {",
                "            console.log('Document validation failed:', docStatus);",
                "        }",
                "    }",
                "}"
              ],
              type: "text/javascript"
            }
          }
        ]
      },
      {
        name: "5. Create Previred Transaction",
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
              customerId: "{{customerId}}",
              identityTransactionId: "{{serviceTransactionId}}",
              documentValidationScanReference: "{{scanReference}}",
              ipVerified: "{{ipVerified}}",
              callbackUrl: "{{callbackUrl}}"
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/previred",
            host: ["{{baseUrl}}"],
            path: ["services", "previred"]
          },
          description: "Step 5: Create Previred transaction using validation results. Extract transactionId for token retrieval."
        },
        event: [
          {
            listen: "prerequest",
            script: {
              exec: [
                "// Get required IDs from collection variables",
                "const savedServiceTransactionId = pm.collectionVariables.get('serviceTransactionId');",
                "const savedScanReference = pm.collectionVariables.get('scanReference');",
                "",
                "if (savedServiceTransactionId) {",
                "    pm.variables.set('serviceTransactionId', savedServiceTransactionId);",
                "    console.log('Using serviceTransactionId from Step 2:', savedServiceTransactionId);",
                "}",
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
                "// Extract transactionId from response",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    if (responseJson.transactionId) {",
                "        pm.collectionVariables.set('transactionId', responseJson.transactionId);",
                "        console.log('transactionId saved:', responseJson.transactionId);",
                "    }",
                "    ",
                "    pm.test('Response contains transactionId', function () {",
                "        pm.expect(responseJson).to.have.property('transactionId');",
                "    });",
                "    ",
                "    pm.test('Response contains hash', function () {",
                "        pm.expect(responseJson).to.have.property('hash');",
                "    });",
                "    ",
                "    console.log('Previred transaction created successfully!');",
                "}"
              ],
              type: "text/javascript"
            }
          }
        ]
      },
      {
        name: "6. Get TVI Token",
        request: {
          method: "GET",
          header: [
            {
              key: "x-api-key",
              value: "{{apiKey}}",
              type: "text"
            }
          ],
          body: {
            mode: "raw",
            raw: ""
          },
          url: {
            raw: "{{baseUrl}}/services/previred/{{transactionId}}",
            host: ["{{baseUrl}}"],
            path: ["services", "previred", "{{transactionId}}"]
          },
          description: "Step 6: Retrieve final TVI token and PDF download URL for compliance verification."
        },
        event: [
          {
            listen: "prerequest",
            script: {
              exec: [
                "// Get transactionId from collection variables",
                "const savedTransactionId = pm.collectionVariables.get('transactionId');",
                "",
                "if (savedTransactionId) {",
                "    pm.variables.set('transactionId', savedTransactionId);",
                "    console.log('Using transactionId from Step 5:', savedTransactionId);",
                "} else {",
                "    console.error('No transactionId found. Make sure Step 5 completed successfully.');",
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
                "// Validate response structure",
                "if (pm.response.code === 200) {",
                "    const responseJson = pm.response.json();",
                "    ",
                "    pm.test('Response contains token', function () {",
                "        pm.expect(responseJson).to.have.property('token');",
                "    });",
                "    ",
                "    pm.test('Response contains download URL', function () {",
                "        pm.expect(responseJson).to.have.property('url');",
                "    });",
                "    ",
                "    pm.test('Token starts with VI19:', function () {",
                "        pm.expect(responseJson.token).to.match(/^VI19:/);",
                "    });",
                "    ",
                "    console.log('TVI Token retrieved successfully!');",
                "    console.log('Token:', responseJson.token);",
                "    console.log('Download URL:', responseJson.url);",
                "    console.log('Previred workflow completed successfully!');",
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

export function generatePreviredPostmanCollection(serviceName: string): PostmanCollection | null {
  switch (serviceName) {
    case 'previredWorkflow':
      return generatePreviredWorkflowCollection();
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