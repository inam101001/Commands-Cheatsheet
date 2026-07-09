import type { Flowchart } from "./types";

export const ciPipelineFailing: Flowchart = {
  id: "ci-pipeline-failing",
  title: "CI pipeline failing",
  description: "Narrow down why a CI run is red, from checkout to deploy.",
  startNodeId: "start",
  nodes: {
    start: {
      id: "start",
      type: "question",
      text: "At which stage does the pipeline fail?",
      options: [
        { label: "Checkout / setup", next: "res-checkout" },
        { label: "Installing dependencies", next: "res-deps" },
        { label: "Build / compile", next: "res-build" },
        { label: "Tests", next: "check-test-consistency" },
        { label: "Deploy / publish", next: "check-deploy-auth" },
      ],
    },
    "check-test-consistency": {
      id: "check-test-consistency",
      type: "question",
      text: "Does it fail consistently every run, or only sometimes (flaky)?",
      options: [
        { label: "Fails consistently", next: "res-test-consistent" },
        { label: "Only sometimes", next: "res-test-flaky" },
      ],
    },
    "check-deploy-auth": {
      id: "check-deploy-auth",
      type: "question",
      text: "Is the failure about authentication/permissions, or something else?",
      options: [
        { label: "Authentication or permissions error", next: "res-deploy-auth" },
        { label: "Something else — timeout, wrong target, health check fails", next: "res-deploy-other" },
      ],
    },
    "res-checkout": {
      id: "res-checkout",
      type: "resolution",
      text: "Checkout / setup step fails",
      cause: "Usually a missing or expired token/credential for a private repo or submodule, an incorrect ref/branch name, or a runner missing a required tool version.",
      fix: "Check the exact error in the checkout step logs. Verify the CI token has repo access, submodules are configured correctly, and the runner image has the expected tool versions.",
    },
    "res-deps": {
      id: "res-deps",
      type: "resolution",
      text: "Dependency installation fails",
      cause: "A lockfile drift (committed lockfile doesn't match package manifest), a registry outage/rate limit, or a dependency requiring a native build tool the CI image doesn't have.",
      fix: "Reproduce locally with a clean install (`rm -rf node_modules && npm ci` or equivalent) to catch lockfile drift. Pin registry mirrors if rate-limited, and add missing build tools to the CI image.",
    },
    "res-build": {
      id: "res-build",
      type: "resolution",
      text: "Build / compile step fails",
      cause: "A real compile/type error that only surfaces with CI's stricter settings (no dev-only flags), an environment variable the build needs that isn't set in CI, or a version mismatch between local and CI toolchains.",
      fix: "Run the exact same build command locally with CI-equivalent environment variables. Pin toolchain versions (Node/Go/Python/etc.) explicitly in the CI config to match your local setup.",
    },
    "res-test-consistent": {
      id: "res-test-consistent",
      type: "resolution",
      text: "Tests fail consistently",
      cause: "A genuine regression, a test that depends on local-only state (files, ports, timezone, locale) that CI doesn't have, or a missing test fixture/environment variable in CI.",
      fix: "Reproduce locally with the same environment variables and a clean checkout. If it passes locally but fails in CI, diff the CI environment (env vars, working directory, service containers) against local.",
    },
    "res-test-flaky": {
      id: "res-test-flaky",
      type: "resolution",
      text: "Tests fail intermittently (flaky)",
      cause: "Usually a race condition, a fixed-time wait that's sometimes too short, shared state leaking between tests, or dependence on network/timing that CI runners handle less predictably than local machines.",
      fix: "Add explicit waits/polling instead of fixed sleeps, ensure tests clean up shared state, and consider running the suspect test in isolation with `--repeat`/multiple runs to confirm the fix before trusting it green.",
    },
    "res-deploy-auth": {
      id: "res-deploy-auth",
      type: "resolution",
      text: "Deploy fails on authentication/permissions",
      cause: "An expired or rotated deploy credential/token, a secret that was never added to this specific CI environment or branch's protected secrets, or insufficient IAM permissions for the deploy action.",
      fix: "Verify the secret exists and is scoped to the branch/environment running the deploy job. Check the exact permission the deploy step needs against what the credential actually has.",
    },
    "res-deploy-other": {
      id: "res-deploy-other",
      type: "resolution",
      text: "Deploy fails for a non-auth reason",
      cause: "Could be a timeout waiting for a health check that never passes, a deploy targeting the wrong environment/region, or the previous deploy still holding a lock.",
      fix: "Check the deploy target/environment config for typos, confirm the health check endpoint actually responds after deploy, and check for a stuck lock from a previous failed run.",
    },
  },
};
