import {
  containerSchema,
  labelSelectorSchema,
  metadataSchema,
  podTemplateSchema,
} from "./common";

const apiVersionKind = (apiVersions: string[], kind: string) => ({
  apiVersion: { type: "string", enum: apiVersions },
  kind: { const: kind },
});

export const k8sSchemas: Record<string, object> = {
  Deployment: {
    type: "object",
    required: ["apiVersion", "kind", "metadata", "spec"],
    properties: {
      ...apiVersionKind(["apps/v1"], "Deployment"),
      metadata: metadataSchema,
      spec: {
        type: "object",
        required: ["selector", "template"],
        properties: {
          replicas: { type: "integer", minimum: 0 },
          selector: labelSelectorSchema,
          template: podTemplateSchema,
          strategy: { type: "object" },
        },
      },
    },
  },

  StatefulSet: {
    type: "object",
    required: ["apiVersion", "kind", "metadata", "spec"],
    properties: {
      ...apiVersionKind(["apps/v1"], "StatefulSet"),
      metadata: metadataSchema,
      spec: {
        type: "object",
        required: ["selector", "template", "serviceName"],
        properties: {
          replicas: { type: "integer", minimum: 0 },
          serviceName: { type: "string" },
          selector: labelSelectorSchema,
          template: podTemplateSchema,
        },
      },
    },
  },

  Service: {
    type: "object",
    required: ["apiVersion", "kind", "metadata", "spec"],
    properties: {
      ...apiVersionKind(["v1"], "Service"),
      metadata: metadataSchema,
      spec: {
        type: "object",
        required: ["ports"],
        properties: {
          selector: { type: "object", additionalProperties: { type: "string" } },
          type: {
            type: "string",
            enum: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
          },
          ports: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["port"],
              properties: {
                name: { type: "string" },
                port: { type: "integer", minimum: 1, maximum: 65535 },
                targetPort: { type: ["integer", "string"] },
                protocol: { type: "string", enum: ["TCP", "UDP", "SCTP"] },
              },
            },
          },
        },
      },
    },
  },

  Ingress: {
    type: "object",
    required: ["apiVersion", "kind", "metadata", "spec"],
    properties: {
      ...apiVersionKind(["networking.k8s.io/v1"], "Ingress"),
      metadata: metadataSchema,
      spec: {
        type: "object",
        properties: {
          ingressClassName: { type: "string" },
          rules: {
            type: "array",
            items: {
              type: "object",
              properties: {
                host: { type: "string" },
                http: {
                  type: "object",
                  required: ["paths"],
                  properties: {
                    paths: {
                      type: "array",
                      minItems: 1,
                      items: {
                        type: "object",
                        required: ["path", "pathType", "backend"],
                        properties: {
                          path: { type: "string" },
                          pathType: {
                            type: "string",
                            enum: ["Prefix", "Exact", "ImplementationSpecific"],
                          },
                          backend: { type: "object" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tls: { type: "array" },
        },
      },
    },
  },

  ConfigMap: {
    type: "object",
    required: ["apiVersion", "kind", "metadata"],
    properties: {
      ...apiVersionKind(["v1"], "ConfigMap"),
      metadata: metadataSchema,
      data: { type: "object", additionalProperties: { type: "string" } },
      binaryData: { type: "object", additionalProperties: { type: "string" } },
    },
  },

  Secret: {
    type: "object",
    required: ["apiVersion", "kind", "metadata"],
    properties: {
      ...apiVersionKind(["v1"], "Secret"),
      metadata: metadataSchema,
      type: { type: "string" },
      data: { type: "object", additionalProperties: { type: "string" } },
      stringData: { type: "object", additionalProperties: { type: "string" } },
    },
  },

  Job: {
    type: "object",
    required: ["apiVersion", "kind", "metadata", "spec"],
    properties: {
      ...apiVersionKind(["batch/v1"], "Job"),
      metadata: metadataSchema,
      spec: {
        type: "object",
        required: ["template"],
        properties: {
          template: podTemplateSchema,
          backoffLimit: { type: "integer", minimum: 0 },
          completions: { type: "integer", minimum: 1 },
          parallelism: { type: "integer", minimum: 0 },
        },
      },
    },
  },

  CronJob: {
    type: "object",
    required: ["apiVersion", "kind", "metadata", "spec"],
    properties: {
      ...apiVersionKind(["batch/v1"], "CronJob"),
      metadata: metadataSchema,
      spec: {
        type: "object",
        required: ["schedule", "jobTemplate"],
        properties: {
          schedule: { type: "string", minLength: 9 },
          concurrencyPolicy: { type: "string", enum: ["Allow", "Forbid", "Replace"] },
          jobTemplate: {
            type: "object",
            required: ["spec"],
            properties: {
              spec: {
                type: "object",
                required: ["template"],
                properties: { template: podTemplateSchema },
              },
            },
          },
        },
      },
    },
  },
};

export const supportedKinds = Object.keys(k8sSchemas);
export { containerSchema };
