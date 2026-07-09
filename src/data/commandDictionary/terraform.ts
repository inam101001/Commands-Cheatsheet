import type { ToolDictionary } from "./types";

const terraformDictionary: ToolDictionary = {
  tool: "Terraform",
  binary: "terraform",
  description: "Infrastructure-as-code tool for provisioning and managing cloud resources via HCL.",
  globalFlags: [
    { flag: "--chdir", description: "Switch to a different working directory before running.", takesValue: true },
    { flag: "--version", description: "Show the current Terraform version." },
    { flag: "--help", description: "Show help for a command." },
  ],
  subcommands: [
    {
      name: "init",
      description: "Initialize a working directory: download providers/modules, configure the backend.",
      flags: [
        { flag: "--upgrade", description: "Upgrade providers and modules to the latest allowed version." },
        { flag: "--reconfigure", description: "Reconfigure the backend, ignoring any saved configuration." },
        { flag: "--migrate-state", description: "Reconfigure the backend and migrate existing state to it." },
        { flag: "--backend", description: "Set to false to skip backend initialization entirely.", takesValue: true },
        { flag: "--backend-config", description: "Provide backend configuration, inline or from a file.", takesValue: true },
        { flag: "--lockfile", description: "Set dependency lockfile mode, e.g. readonly.", takesValue: true },
        { flag: "--input", description: "Set to false to disable interactive prompts.", takesValue: true },
      ],
    },
    {
      name: "plan",
      description: "Show what changes Terraform would make without applying them.",
      flags: [
        { flag: "--out", description: "Save the generated plan to a file for later apply.", takesValue: true },
        { flag: "--destroy", description: "Create a plan to destroy all managed infrastructure." },
        { flag: "--refresh-only", description: "Only reconcile state with real infrastructure, no other changes." },
        { flag: "--refresh", description: "Set to false to skip refreshing state before planning (faster, less accurate).", takesValue: true },
        { flag: "--var", description: "Set a single input variable.", takesValue: true },
        { flag: "--var-file", description: "Load variable values from a file.", takesValue: true },
        { flag: "--target", description: "Limit planning to a specific resource and its dependencies (use sparingly)." , takesValue: true},
        { flag: "--replace", description: "Force a specific resource to be destroyed and recreated.", takesValue: true },
      ],
    },
    {
      name: "apply",
      description: "Apply the changes required to reach the desired state.",
      flags: [
        { flag: "--auto-approve", description: "Skip the interactive approval prompt." },
        { flag: "--var", description: "Set a single input variable.", takesValue: true },
        { flag: "--var-file", description: "Load variable values from a file.", takesValue: true },
        { flag: "--target", description: "Limit apply to a specific resource and its dependencies.", takesValue: true },
        { flag: "--replace", description: "Force a specific resource to be destroyed and recreated.", takesValue: true },
        { flag: "--refresh-only", description: "Only update state to match real infrastructure." },
        { flag: "--parallelism", description: "Limit the number of concurrent resource operations.", takesValue: true },
      ],
    },
    {
      name: "destroy",
      description: "Destroy all resources managed by the current configuration.",
      flags: [
        { flag: "--auto-approve", description: "Skip the interactive confirmation prompt." },
        { flag: "--target", description: "Limit destruction to a specific resource.", takesValue: true },
      ],
    },
    {
      name: "state list",
      description: "List resources tracked in the current state.",
      flags: [],
    },
    {
      name: "state show",
      description: "Show the attributes of a single resource in the state.",
      flags: [],
    },
    {
      name: "state mv",
      description: "Move an item in the state (e.g. after renaming a resource in code, without destroying it).",
      flags: [],
    },
    {
      name: "state rm",
      description: "Remove an item from the state without destroying the real infrastructure.",
      flags: [],
    },
    {
      name: "import",
      description: "Bring an existing resource under Terraform management by writing it into the state.",
      flags: [],
    },
    {
      name: "fmt",
      description: "Rewrite configuration files to a canonical format and style.",
      flags: [
        { flag: "--recursive", description: "Process subdirectories too." },
        { flag: "--check", description: "Only check if formatting is needed; exit non-zero if so (good for CI)." },
        { flag: "--diff", description: "Show the diff of formatting changes." },
      ],
    },
    {
      name: "validate",
      description: "Check configuration files for syntax and internal consistency errors, without touching state.",
      flags: [{ flag: "--json", description: "Output validation results as JSON." }],
    },
    {
      name: "workspace list",
      description: "List all workspaces.",
      flags: [],
    },
    {
      name: "workspace new",
      description: "Create a new workspace.",
      flags: [],
    },
    {
      name: "workspace select",
      description: "Switch to a different existing workspace.",
      flags: [],
    },
    {
      name: "output",
      description: "Show output values from the state.",
      flags: [
        { flag: "--json", description: "Output all outputs as JSON." },
        { flag: "--raw", description: "Output a single value as a raw, unquoted string." },
      ],
    },
    {
      name: "graph",
      description: "Generate a visual dependency graph of resources in DOT format.",
      flags: [],
    },
  ],
};

export default terraformDictionary;
