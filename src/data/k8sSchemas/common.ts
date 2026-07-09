export const metadataSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", minLength: 1, maxLength: 253 },
    namespace: { type: "string" },
    labels: { type: "object", additionalProperties: { type: "string" } },
    annotations: { type: "object", additionalProperties: { type: "string" } },
  },
};

export const resourceQuantitySchema = {
  type: "object",
  properties: {
    requests: {
      type: "object",
      properties: {
        cpu: { type: "string" },
        memory: { type: "string" },
      },
    },
    limits: {
      type: "object",
      properties: {
        cpu: { type: "string" },
        memory: { type: "string" },
      },
    },
  },
};

export const containerSchema = {
  type: "object",
  required: ["name", "image"],
  properties: {
    name: { type: "string" },
    image: { type: "string", minLength: 1 },
    command: { type: "array", items: { type: "string" } },
    args: { type: "array", items: { type: "string" } },
    ports: {
      type: "array",
      items: {
        type: "object",
        required: ["containerPort"],
        properties: {
          containerPort: { type: "integer", minimum: 1, maximum: 65535 },
          protocol: { type: "string", enum: ["TCP", "UDP", "SCTP"] },
        },
      },
    },
    env: {
      type: "array",
      items: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          value: { type: "string" },
        },
      },
    },
    resources: resourceQuantitySchema,
    volumeMounts: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "mountPath"],
        properties: {
          name: { type: "string" },
          mountPath: { type: "string" },
          readOnly: { type: "boolean" },
        },
      },
    },
    imagePullPolicy: { type: "string", enum: ["Always", "IfNotPresent", "Never"] },
  },
};

export const podSpecSchema = {
  type: "object",
  required: ["containers"],
  properties: {
    containers: { type: "array", minItems: 1, items: containerSchema },
    initContainers: { type: "array", items: containerSchema },
    volumes: { type: "array", items: { type: "object", required: ["name"] } },
    restartPolicy: { type: "string", enum: ["Always", "OnFailure", "Never"] },
    serviceAccountName: { type: "string" },
    nodeSelector: { type: "object", additionalProperties: { type: "string" } },
    terminationGracePeriodSeconds: { type: "integer", minimum: 0 },
  },
};

export const podTemplateSchema = {
  type: "object",
  required: ["spec"],
  properties: {
    metadata: metadataSchema,
    spec: podSpecSchema,
  },
};

export const labelSelectorSchema = {
  type: "object",
  properties: {
    matchLabels: { type: "object", additionalProperties: { type: "string" } },
    matchExpressions: { type: "array" },
  },
};
