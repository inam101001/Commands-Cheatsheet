export interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const ALIASES: Record<string, string> = {
  "@yearly": "0 0 1 1 *",
  "@annually": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@midnight": "0 0 * * *",
  "@hourly": "0 * * * *",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DOW_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

export function parseCronFields(expression: string): CronFields | null {
  const normalized = ALIASES[expression.trim().toLowerCase()] ?? expression.trim();
  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length !== 5) return null;
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  return { minute, hour, dayOfMonth, month, dayOfWeek };
}

export function fieldsToExpression(fields: CronFields): string {
  return [fields.minute, fields.hour, fields.dayOfMonth, fields.month, fields.dayOfWeek].join(" ");
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

function describeField(
  value: string,
  unitPlural: string,
  formatValue: (n: number) => string = (n) => n.toString(),
  named = false,
): string {
  const prefix = named ? "" : `${unitPlural.replace(/s$/, "")} `;
  const prefixPlural = named ? "" : `${unitPlural} `;

  if (value === "*") return `every ${unitPlural.replace(/s$/, "") || "one"}`;

  const stepMatch = value.match(/^(\*|\d+-\d+)\/(\d+)$/);
  if (stepMatch) {
    const [, range, step] = stepMatch;
    const rangeText = range === "*" ? "" : ` from ${range.replace("-", " through ")}`;
    return `every ${step} ${unitPlural || "units"}${rangeText}`;
  }

  const rangeMatch = value.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    return `${prefixPlural}${formatValue(parseInt(rangeMatch[1], 10))} through ${formatValue(parseInt(rangeMatch[2], 10))}`;
  }

  if (value.includes(",")) {
    const items = value.split(",").map((v) => formatValue(parseInt(v, 10)));
    return `${prefixPlural}${items.slice(0, -1).join(", ")}${items.length > 1 ? " and " : ""}${items[items.length - 1]}`;
  }

  const n = parseInt(value, 10);
  if (!Number.isNaN(n)) return `${prefix}${formatValue(n)}`;

  return `${prefixPlural}${value}`;
}

export function describeCron(expression: string): string {
  const fields = parseCronFields(expression);
  if (!fields) return "Not a valid 5-field cron expression.";

  const { minute, hour, dayOfMonth, month, dayOfWeek } = fields;

  const isFixedMinute = /^\d+$/.test(minute);
  const isFixedHour = /^\d+$/.test(hour);

  const parts: string[] = [];

  if (isFixedMinute && isFixedHour) {
    parts.push(`At ${pad2(parseInt(hour, 10))}:${pad2(parseInt(minute, 10))}`);
  } else if (minute === "*" && hour === "*") {
    parts.push("Every minute");
  } else {
    parts.push(
      `At ${describeField(minute, "minutes")}, ${describeField(hour, "hours").replace(/^./, (c) => c.toLowerCase())}`,
    );
  }

  if (dayOfMonth === "*" && dayOfWeek === "*") {
    parts.push("every day");
  } else if (dayOfMonth !== "*" && dayOfWeek === "*") {
    parts.push(`on ${describeField(dayOfMonth, "days of the month")}`);
  } else if (dayOfMonth === "*" && dayOfWeek !== "*") {
    parts.push(`on ${describeField(dayOfWeek, "weekdays", (n) => DOW_NAMES[n] ?? n.toString(), true)}`);
  } else {
    parts.push(
      `on ${describeField(dayOfMonth, "days of the month")} and on ${describeField(dayOfWeek, "weekdays", (n) => DOW_NAMES[n] ?? n.toString(), true)}`,
    );
  }

  if (month !== "*") {
    parts.push(`in ${describeField(month, "months", (n) => MONTH_NAMES[n - 1] ?? n.toString(), true)}`);
  }

  return parts.join(", ") + ".";
}

export const CRON_PRESETS: { label: string; expression: string }[] = [
  { label: "Every minute", expression: "* * * * *" },
  { label: "Every 5 minutes", expression: "*/5 * * * *" },
  { label: "Every hour", expression: "0 * * * *" },
  { label: "Daily at midnight", expression: "0 0 * * *" },
  { label: "Daily at 9 AM", expression: "0 9 * * *" },
  { label: "Weekly, Monday at 9 AM", expression: "0 9 * * 1" },
  { label: "Monthly on the 1st at midnight", expression: "0 0 1 * *" },
];
