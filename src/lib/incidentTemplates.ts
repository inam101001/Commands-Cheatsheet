export interface PostmortemFields {
  title: string;
  date: string;
  severity: string;
  author: string;
  summary: string;
  impact: string;
  timeline: string;
  rootCause: string;
  resolution: string;
  actionItems: string;
  lessonsLearned: string;
}

export const emptyPostmortem: PostmortemFields = {
  title: "",
  date: "",
  severity: "SEV-2",
  author: "",
  summary: "",
  impact: "",
  timeline: "",
  rootCause: "",
  resolution: "",
  actionItems: "",
  lessonsLearned: "",
};

export function renderPostmortem(f: PostmortemFields): string {
  return `# Postmortem: ${f.title || "<title>"}

**Date:** ${f.date || "<date>"}
**Severity:** ${f.severity}
**Author:** ${f.author || "<author>"}

> This is a blameless postmortem — the goal is to understand systemic causes, not to assign fault.

## Summary
${f.summary || "<one-paragraph summary of what happened>"}

## Impact
${f.impact || "<who/what was affected, for how long, any user-facing symptoms>"}

## Timeline
${f.timeline || "<UTC timestamps of detection, escalation, mitigation, resolution>"}

## Root Cause
${f.rootCause || "<the underlying cause, not just the trigger>"}

## Resolution
${f.resolution || "<what fixed it, and how it was verified>"}

## Action Items
${f.actionItems || "<concrete follow-ups with owners and due dates>"}

## Lessons Learned
${f.lessonsLearned || "<what went well, what didn't, what surprised us>"}
`;
}

export interface HandoffFields {
  outgoingOnCall: string;
  incomingOnCall: string;
  shiftDate: string;
  openIncidents: string;
  watchItems: string;
  recentChanges: string;
  notes: string;
}

export const emptyHandoff: HandoffFields = {
  outgoingOnCall: "",
  incomingOnCall: "",
  shiftDate: "",
  openIncidents: "",
  watchItems: "",
  recentChanges: "",
  notes: "",
};

export function renderHandoff(f: HandoffFields): string {
  return `# On-Call Handoff — ${f.shiftDate || "<date>"}

**Outgoing:** ${f.outgoingOnCall || "<name>"}
**Incoming:** ${f.incomingOnCall || "<name>"}

## Open Incidents
${f.openIncidents || "<any active incidents, current status, next steps>"}

## Things to Watch
${f.watchItems || "<flaky alerts, ongoing degradations, scheduled maintenance>"}

## Recent Changes
${f.recentChanges || "<deploys, config changes, or migrations in the last shift that could still be causing issues>"}

## Notes for Next On-Call
${f.notes || "<anything else the next person should know>"}
`;
}
