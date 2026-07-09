import type { ToolDictionary } from "./types";

const kubectlDictionary: ToolDictionary = {
  tool: "Kubernetes",
  binary: "kubectl",
  description: "Command-line tool for interacting with a Kubernetes cluster.",
  globalFlags: [
    { flag: "--namespace", aliases: ["-n"], description: "Restrict the command to a specific namespace.", takesValue: true },
    { flag: "--all-namespaces", aliases: ["-A"], description: "Apply the command across all namespaces." },
    { flag: "--context", description: "Name of the kubeconfig context to use.", takesValue: true },
    { flag: "--kubeconfig", description: "Path to the kubeconfig file to use.", takesValue: true },
    { flag: "--output", aliases: ["-o"], description: "Output format: json, yaml, wide, name, jsonpath=...", takesValue: true },
  ],
  subcommands: [
    {
      name: "get",
      description: "List one or more resources.",
      flags: [
        { flag: "--output", aliases: ["-o"], description: "Output format (wide, json, yaml, jsonpath).", takesValue: true },
        { flag: "--selector", aliases: ["-l"], description: "Filter by label selector.", takesValue: true },
        { flag: "--field-selector", description: "Filter by field selector, e.g. status.phase=Running.", takesValue: true },
        { flag: "--watch", aliases: ["-w"], description: "Watch for changes after listing." },
        { flag: "--show-labels", description: "Show all labels as a column." },
        { flag: "--sort-by", description: "Sort output by a JSONPath expression.", takesValue: true },
      ],
    },
    {
      name: "describe",
      description: "Show detailed state and recent events for a resource.",
      flags: [
        { flag: "--selector", aliases: ["-l"], description: "Filter by label selector.", takesValue: true },
      ],
    },
    {
      name: "logs",
      description: "Print logs for a container in a pod.",
      flags: [
        { flag: "--follow", aliases: ["-f"], description: "Stream logs continuously." },
        { flag: "--previous", aliases: ["-p"], description: "Show logs from the previously terminated container (useful after a crash)." },
        { flag: "--container", aliases: ["-c"], description: "Which container's logs to show, for multi-container pods.", takesValue: true },
        { flag: "--tail", description: "Number of lines from the end of the logs to show.", takesValue: true },
        { flag: "--since", description: "Show logs since a relative duration, e.g. 5m.", takesValue: true },
        { flag: "--timestamps", description: "Include timestamps on each line." },
      ],
    },
    {
      name: "apply",
      description: "Apply a configuration to a resource by file or stdin (declarative, creates or updates).",
      flags: [
        { flag: "--filename", aliases: ["-f"], description: "File, directory, or URL to apply.", takesValue: true },
        { flag: "--recursive", aliases: ["-R"], description: "Process directories recursively." },
        { flag: "--dry-run", description: "Preview the change without applying it (client or server).", takesValue: true },
        { flag: "--force", description: "Delete and re-create the resource if patching fails." },
        { flag: "--prune", description: "Delete resources not present in the applied config." },
      ],
    },
    {
      name: "delete",
      description: "Delete resources by file, name, label, or resource selector.",
      flags: [
        { flag: "--filename", aliases: ["-f"], description: "File to read resources from.", takesValue: true },
        { flag: "--selector", aliases: ["-l"], description: "Delete resources matching a label selector.", takesValue: true },
        { flag: "--force", description: "Skip graceful deletion and confirmation (immediate removal)." },
        { flag: "--grace-period", description: "Seconds given to the resource to terminate gracefully.", takesValue: true },
        { flag: "--all", description: "Delete all resources of the given type in the namespace." },
      ],
    },
    {
      name: "create deployment",
      description: "Create a new Deployment.",
      flags: [
        { flag: "--image", description: "Container image to run.", takesValue: true },
        { flag: "--replicas", description: "Number of desired pods.", takesValue: true },
        { flag: "--port", description: "Port the container exposes.", takesValue: true },
        { flag: "--dry-run", description: "Preview without creating.", takesValue: true },
      ],
    },
    {
      name: "rollout status",
      description: "Watch the rollout status of a resource until it completes.",
      flags: [{ flag: "--watch", aliases: ["-w"], description: "Watch until the rollout completes." }],
    },
    {
      name: "rollout undo",
      description: "Roll back to a previous revision.",
      flags: [{ flag: "--to-revision", description: "Roll back to a specific revision number.", takesValue: true }],
    },
    {
      name: "rollout restart",
      description: "Restart the pods of a resource (rolling restart), useful to pick up a ConfigMap/Secret change.",
      flags: [],
    },
    {
      name: "scale",
      description: "Set a new number of replicas for a resource.",
      flags: [{ flag: "--replicas", description: "The new number of desired replicas.", takesValue: true }],
    },
    {
      name: "exec",
      description: "Execute a command in a container.",
      flags: [
        { flag: "--stdin", aliases: ["-i"], description: "Pass stdin to the container." },
        { flag: "--tty", aliases: ["-t"], description: "Allocate a TTY." },
        { flag: "--container", aliases: ["-c"], description: "Container to exec into, for multi-container pods.", takesValue: true },
      ],
    },
    {
      name: "port-forward",
      description: "Forward one or more local ports to a pod.",
      flags: [],
    },
    {
      name: "top pods",
      description: "Show CPU/memory usage for pods (requires metrics-server).",
      flags: [{ flag: "--containers", description: "Show usage per container instead of per pod." }],
    },
    {
      name: "cluster-info",
      description: "Display endpoint information about the control plane and services.",
      flags: [],
    },
    {
      name: "config use-context",
      description: "Switch the active kubeconfig context.",
      flags: [],
    },
    {
      name: "explain",
      description: "Show documentation for a resource's fields (e.g. `kubectl explain pod.spec.containers`).",
      flags: [{ flag: "--recursive", description: "Print the full field tree." }],
    },
  ],
};

export default kubectlDictionary;
