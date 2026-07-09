"use client";

import { useMemo, useState } from "react";
import { useCopy } from "./ToastProvider";

type Tool = "docker" | "kubectl";

interface TerminalLine {
  text: string;
  variant: "input" | "output" | "success";
}

const DELAYS = [400, 1000, 1500, 1800, 2200];

export function CommandBuilderPanel() {
  const [tool, setTool] = useState<Tool>("docker");
  const [dockerImage, setDockerImage] = useState("nginx:alpine");
  const [dockerPort, setDockerPort] = useState("8080:80");
  const [dockerName, setDockerName] = useState("my-web-app");
  const [detached, setDetached] = useState(true);
  const [autoRemove, setAutoRemove] = useState(true);

  const [k8sDeploy, setK8sDeploy] = useState("nginx-deployment");
  const [k8sImage, setK8sImage] = useState("nginx:latest");
  const [k8sReplicas, setK8sReplicas] = useState("3");
  const [k8sPort, setK8sPort] = useState("80");

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      text: "$ Welcome to DevOps terminal playground. Select options on the left and run!",
      variant: "input",
    },
  ]);
  const [running, setRunning] = useState(false);
  const copy = useCopy();

  const command = useMemo(() => {
    if (tool === "docker") {
      let cmd = "docker run";
      if (detached) cmd += " -d";
      if (autoRemove) cmd += " --rm";
      if (dockerPort) cmd += ` -p ${dockerPort}`;
      if (dockerName) cmd += ` --name ${dockerName}`;
      cmd += ` ${dockerImage || "image"}`;
      return cmd;
    }
    let cmd = `kubectl create deployment ${k8sDeploy || "my-deploy"} --image=${k8sImage || "nginx"} --replicas=${k8sReplicas || "1"}`;
    if (k8sPort) cmd += ` --port=${k8sPort}`;
    return cmd;
  }, [
    tool,
    detached,
    autoRemove,
    dockerPort,
    dockerName,
    dockerImage,
    k8sDeploy,
    k8sImage,
    k8sReplicas,
    k8sPort,
  ]);

  function runSandbox() {
    if (running) return;
    setRunning(true);
    setLines([{ text: `$ ${command}`, variant: "input" }]);

    const dockerSteps: TerminalLine[] = [
      { text: "Unable to find image locally... pulling image layers", variant: "output" },
      { text: "ef076412: Pull complete [5.4 MB / 5.4 MB]", variant: "output" },
      { text: "Digest: sha256:4a0280efea54817a0279d01249bcf82e", variant: "output" },
      {
        text: `Status: Downloaded newer image for ${dockerImage || "image"}`,
        variant: "output",
      },
      { text: "Container spawned successfully!", variant: "output" },
    ];
    const k8sSteps: TerminalLine[] = [
      { text: "Connecting to kubernetes api server cluster...", variant: "output" },
      {
        text: `deployment.apps/${k8sDeploy || "my-deploy"} created successfully.`,
        variant: "output",
      },
      { text: "Scaling replicas and scheduling deployment pods...", variant: "output" },
      { text: "Pod 1: Scheduled -> ContainerCreating", variant: "output" },
      { text: "Pod 2: Scheduled -> Running", variant: "output" },
    ];

    const steps = tool === "docker" ? dockerSteps : k8sSteps;
    const finalLine: TerminalLine =
      tool === "docker"
        ? {
            text: "⚡ Sandbox Execution SUCCESS. Container listening on local ports!",
            variant: "success",
          }
        : {
            text: '⚡ Kubernetes deployment sandbox success! Run "kubectl get deployments" to verify status.',
            variant: "success",
          };

    steps.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setLines((prev) => [...prev, finalLine]);
            setRunning(false);
          }, 300);
        }
      }, DELAYS[i] ?? 400 * (i + 1));
    });
  }

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-panel rounded-xl p-6">
        <div className="mb-4 font-display text-xl text-accent-blue">
          Interactive CLI Constructor
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-text-muted">
            Target Action
          </label>
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value as Tool)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent-blue"
          >
            <option value="docker">Docker Run Container</option>
            <option value="kubectl">Kubectl Create Deployment</option>
          </select>
        </div>

        {tool === "docker" ? (
          <>
            <BuilderField label="Docker Image Name" value={dockerImage} onChange={setDockerImage} />
            <BuilderField
              label="Port Mapping (Host:Container)"
              value={dockerPort}
              onChange={setDockerPort}
            />
            <BuilderField
              label="Container Instance Name"
              value={dockerName}
              onChange={setDockerName}
            />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={detached}
                  onChange={(e) => setDetached(e.target.checked)}
                  className="accent-accent-blue"
                />
                Detached (-d)
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={autoRemove}
                  onChange={(e) => setAutoRemove(e.target.checked)}
                  className="accent-accent-blue"
                />
                Auto-Remove (--rm)
              </label>
            </div>
          </>
        ) : (
          <>
            <BuilderField label="Deployment Name" value={k8sDeploy} onChange={setK8sDeploy} />
            <BuilderField label="Image Name" value={k8sImage} onChange={setK8sImage} />
            <BuilderField label="Replicas count" value={k8sReplicas} onChange={setK8sReplicas} />
            <BuilderField
              label="Container Target Port"
              value={k8sPort}
              onChange={setK8sPort}
            />
          </>
        )}

        <div className="relative mt-5 rounded-md border border-border bg-bg p-3.5 font-mono text-accent-blue-light">
          <span className="pr-16">{command}</span>
          <button
            onClick={() => copy(command)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-border-3 px-2.5 py-1 text-xs text-text hover:bg-border-3/70"
          >
            Copy
          </button>
        </div>

        <button
          onClick={runSandbox}
          disabled={running}
          className="mt-3.5 w-full rounded-md bg-accent-blue py-3 text-[15px] font-bold text-bg hover:bg-accent-blue-light disabled:opacity-60"
        >
          ⚡ Run Command Sandbox
        </button>
      </div>

      <div className="flex h-[480px] flex-col rounded-xl border border-border bg-[#02040a] p-4">
        <div className="mb-3.5 flex items-center justify-between border-b border-border-2 pb-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-xs text-text-muted">
            DevOps Virtual Playground Terminal
          </span>
          <span className="font-mono text-xs text-accent-blue-light">bash</span>
        </div>
        <div className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed text-accent-cyan">
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.variant === "input"
                  ? "mb-2.5 text-text"
                  : line.variant === "success"
                    ? "mb-1 font-semibold text-accent-cyan"
                    : "mb-1 text-text-muted"
              }
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuilderField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium text-text-muted">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent-blue"
      />
    </div>
  );
}
