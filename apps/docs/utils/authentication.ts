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

export const SUPPORTED_AUTHENTICATION_SERVICES = {
  '/docs/services/authentication/authenticateUserV2': 'authenticateUserV2',
  '/docs/services/authentication/authenticateUser': 'authenticateUser',
  '/docs/services/authentication/deleteUsers': 'deleteUsers',
  '/docs/services/authentication/updateUserTemplate': 'updateUserTemplate',
} as const;

export function isSupportedAuthenticationService(pathname: string): boolean {
  return Object.keys(SUPPORTED_AUTHENTICATION_SERVICES).some(service =>
    pathname.includes(service)
  );
}

export function getCurrentAuthenticationService(pathname: string): string | null {
  const service = Object.keys(SUPPORTED_AUTHENTICATION_SERVICES).find(service =>
    pathname.includes(service)
  );
  return service ? SUPPORTED_AUTHENTICATION_SERVICES[service as keyof typeof SUPPORTED_AUTHENTICATION_SERVICES] : null;
}

export function generateAuthenticateUserV2Collection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Authenticate User V2",
      description: "This service validates both liveness and facial authentication. It compares the biometric template (templateRaw), which was previously validated and stored in the client's data repository during the Onboarding process, with a bestImageToken generated at the time of authentication.",
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
        key: "userId",
        value: "{{USER_ID}}",
        type: "string"
      },
      {
        key: "registeredTemplateRaw",
        value: "{{REGISTERED_TEMPLATE_RAW}}",
        type: "string"
      },
      {
        key: "bestImageToken",
        value: "{{BEST_IMAGE_TOKEN}}",
        type: "string"
      },
      {
        key: "merchantReferenceId",
        value: "{{MERCHANT_REFERENCE_ID}}",
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
        key: "image",
        value: "{{IMAGE_BASE64}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "Authenticate User V2 - With Template",
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
              userId: "{{userId}}",
              registeredTemplateRaw: "{{registeredTemplateRaw}}",
              bestImageToken: "{{bestImageToken}}",
              merchantReferenceId: "{{merchantReferenceId}}",
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/authenticateUser/v2",
            host: ["{{baseUrl}}"],
            path: ["services", "authenticateUser", "v2"]
          },
          description: "Authentication using registered biometric template. This validates both liveness and facial authentication by comparing the stored template with the current authentication token."
        }
      },
      {
        name: "Authenticate User V2 - With Image",
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
              userId: "{{userId}}",
              image: "{{image}}",
              bestImageToken: "{{bestImageToken}}",
              merchantReferenceId: "{{merchantReferenceId}}",
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/authenticateUser/v2",
            host: ["{{baseUrl}}"],
            path: ["services", "authenticateUser", "v2"]
          },
          description: "Authentication using civil registry image. Alternative method when registered biometric template is not available."
        }
      }
    ]
  };
}

export function generateAuthenticateUserCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Authenticate User",
      description: "This service validates both liveness and facial authentication. It compares the biometric template (templateRaw), which was previously validated and stored in the client's data repository during the Onboarding process, with a bestImageToken generated at the time of authentication.",
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
        key: "userId",
        value: "{{USER_ID}}",
        type: "string"
      },
      {
        key: "registeredTemplateRaw",
        value: "{{REGISTERED_TEMPLATE_RAW}}",
        type: "string"
      },
      {
        key: "bestImageToken",
        value: "{{BEST_IMAGE_TOKEN}}",
        type: "string"
      },
      {
        key: "merchantReferenceId",
        value: "{{MERCHANT_REFERENCE_ID}}",
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
        key: "image",
        value: "{{IMAGE_BASE64}}",
        type: "string"
      },
      {
        key: "userIds",
        value: "{{USER_IDS_ARRAY}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "Authenticate User - With Template",
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
              userId: "{{userId}}",
              registeredTemplateRaw: "{{registeredTemplateRaw}}",
              bestImageToken: "{{bestImageToken}}",
              merchantReferenceId: "{{merchantReferenceId}}",
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/authenticateUser",
            host: ["{{baseUrl}}"],
            path: ["services", "authenticateUser"]
          },
          description: "Standard authentication using registered biometric template. Compares stored template with current authentication token."
        }
      },
      {
        name: "Authenticate User - With Image",
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
              userId: "{{userId}}",
              image: "{{image}}",
              bestImageToken: "{{bestImageToken}}",
              merchantReferenceId: "{{merchantReferenceId}}",
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/authenticateUser",
            host: ["{{baseUrl}}"],
            path: ["services", "authenticateUser"]
          },
          description: "Authentication using civil registry image. Alternative method when registered biometric template is not available."
        }
      },
      {
        name: "Delete Users",
        request: {
          method: "DELETE",
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
              userIds: ["{{userId}}"]
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/authenticateUser",
            host: ["{{baseUrl}}"],
            path: ["services", "authenticateUser"]
          },
          description: "Allows batch deletion of registered users from the authentication system. Provide an array of user IDs to delete."
        }
      }
    ]
  };
}

export function generateUpdateUserTemplateCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Update User Template",
      description: "The service allows the updating of the biometric template associated with a specific user. Its main function is to synchronize the user's most recent facial template stored in the client's data repository with a new template registered for the user.",
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
        key: "userId",
        value: "{{USER_ID}}",
        type: "string"
      },
      {
        key: "oldRegisteredTemplateRaw",
        value: "{{OLD_REGISTERED_TEMPLATE_RAW}}",
        type: "string"
      },
      {
        key: "newRegisteredTemplateRaw",
        value: "{{NEW_REGISTERED_TEMPLATE_RAW}}",
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
        key: "image",
        value: "{{IMAGE_BASE64}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "Update User Template",
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
              userId: "{{userId}}",
              oldRegisteredTemplateRaw: "{{oldRegisteredTemplateRaw}}",
              newRegisteredTemplateRaw: "{{newRegisteredTemplateRaw}}",
              tracking: {
                extraData: "{{extraData}}",
                operationId: "{{operationId}}"
              }
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/updateUserTemplate",
            host: ["{{baseUrl}}"],
            path: ["services", "updateUserTemplate"]
          },
          description: "Updates the biometric template associated with a specific user. Synchronizes the user's most recent facial template with a new registered template for future authentications."
        }
      }
    ]
  };
}

export function generateDeleteUsersCollection(): PostmanCollection {
  return {
    info: {
      name: "IDAPI: Delete Users",
      description: "Allows batch deletion of registered users from the authentication system.",
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
        key: "userIds",
        value: "{{USER_IDS_ARRAY}}",
        type: "string"
      }
    ],
    item: [
      {
        name: "Delete Users",
        request: {
          method: "DELETE",
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
              userIds: ["{{userIds}}"]
            }, null, 2)
          },
          url: {
            raw: "{{baseUrl}}/services/authenticateUser",
            host: ["{{baseUrl}}"],
            path: ["services", "authenticateUser"]
          },
          description: "Allows batch deletion of registered users from the authentication system. Provide an array of user IDs to delete."
        }
      }
    ]
  };
}

export function generateAuthenticationPostmanCollection(serviceName: string): PostmanCollection | null {
  switch (serviceName) {
    case 'authenticateUserV2':
      return generateAuthenticateUserV2Collection();
    case 'authenticateUser':
      return generateAuthenticateUserCollection();
    case 'deleteUsers':
      return generateDeleteUsersCollection();
    case 'updateUserTemplate':
      return generateUpdateUserTemplateCollection();
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