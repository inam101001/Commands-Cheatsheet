import type { CheatsheetData } from "@/data/types";

const data: CheatsheetData = {
  title: "🔥 Prometheus & Grafana Reference",
  subtitle: "TSDB config, PromQL, Alertmanager, Loki LogQL, and Tempo tracing",
  cards: [
    {
      title: "Prometheus CLI & Management",
      span: 1,
      blocks: [
        { type: "row", cmd: "prometheus --config.file=p.yml", desc: "Start with custom config" },
        { type: "row", cmd: "--storage.tsdb.retention.time=15d", desc: "Set retention duration" },
        { type: "row", cmd: "--storage.tsdb.retention.size=50GB", desc: "Set retention disk limit" },
        { type: "row", cmd: "--web.enable-lifecycle", desc: "Enable hot reloads via HTTP POST" },
        { type: "row", cmd: "--web.enable-admin-api", desc: "Enable admin endpoint actions" },
        { type: "row", cmd: "promtool check config prom.yml", desc: "Validate config syntax" },
        { type: "row", cmd: "promtool check rules rules.yml", desc: "Validate alerting/recording rules" },
        { type: "row", cmd: "promtool query instant URL \"Q\"", desc: "Execute instant query from CLI" },
        { type: "row", cmd: "curl -X POST http://localhost:9090/-/reload", desc: "Trigger config reload (hot reload)" },
      ],
    },
    {
      title: "Prometheus Configuration (yml)",
      span: 1,
      blocks: [
        { type: "code", text: "global:\n  scrape_interval: 15s\n  evaluation_interval: 15s\n\nscrape_configs:\n  - job_name: 'node'\n    static_configs:\n      - targets: ['localhost:9100']\n    relabel_configs:\n      - source_labels: [__address__]\n        target_label: instance\n        replacement: 'web-node'" },
      ],
    },
    {
      title: "PromQL Selectors & Matchers",
      span: 1,
      blocks: [
        { type: "row", cmd: "http_requests_total", desc: "Match metric name" },
        { type: "row", cmd: "http_requests_total{status=\"200\"}", desc: "Exact equality match label" },
        { type: "row", cmd: "http_requests_total{status!=\"500\"}", desc: "Inequality match label" },
        { type: "row", cmd: "http_requests_total{job=~\"api-.*\"}", desc: "Regex match label" },
        { type: "row", cmd: "http_requests_total{job!~\"test-.*\"}", desc: "Negative regex match label" },
        { type: "row", cmd: "http_requests_total[5m]", desc: "Range vector selector (5 min)" },
        { type: "row", cmd: "http_requests_total offset 1h", desc: "Offset query by 1 hour" },
        { type: "row", cmd: "http_requests_total @ 1609459200", desc: "Evaluate at specific unix epoch" },
      ],
    },
    {
      title: "PromQL Operators & Aggregations",
      span: 1,
      blocks: [
        { type: "row", cmd: "sum(node_cpu_seconds_total) by (mode)", desc: "Sum values, grouping by mode" },
        { type: "row", cmd: "avg(node_load1) without (instance)", desc: "Average, excluding instance label" },
        { type: "row", cmd: "rate(http_requests_total[5m]) * 100", desc: "Multiply query output by scalar" },
        { type: "row", cmd: "val1 > bool 50", desc: "Return boolean 0 or 1 for threshold" },
        { type: "row", cmd: "q1 and q2", desc: "Logical AND matching labels" },
        { type: "row", cmd: "q1 or q2", desc: "Logical OR combination" },
        { type: "row", cmd: "q1 ignoring(port) group_left q2", desc: "Many-to-one label matching" },
      ],
    },
    {
      title: "PromQL Essential Functions",
      span: 1,
      blocks: [
        { type: "row", cmd: "rate(http_requests_total[5m])", desc: "Per-second average rate over range" },
        { type: "row", cmd: "irate(http_requests_total[2m])", desc: "Instant per-second rate (last 2 pts)" },
        { type: "row", cmd: "increase(container_cpu_usage[1h])", desc: "Total increase in monotonic counter" },
        { type: "row", cmd: "histogram_quantile(0.99, sum(rate(...)))", desc: "Calculate 99th percentile latency" },
        { type: "row", cmd: "predict_linear(node_filesystem_free[1h], 86400)", desc: "Predict value 24 hours from now" },
        { type: "row", cmd: "label_replace(q, \"dst\", \"$1\", \"src\", \"(.*)\")", desc: "Extract & create new label field" },
        { type: "row", cmd: "absent(up{job=\"api\"})", desc: "Returns 1 if vector has no elements" },
      ],
    },
    {
      title: "Alertmanager & Alert Rules",
      span: 1,
      blocks: [
        { type: "code", text: "# Prometheus Alerting Rule\ngroups:\n  - name: hosts\n    rules:\n    - alert: InstanceDown\n      expr: up == 0\n      for: 5m\n      labels:\n        severity: critical\n      annotations:\n        summary: \"Instance {{ $labels.instance }} is down\"" },
        { type: "row", cmd: "amtool check-config alertmanager.yml", desc: "Validate alertmanager configuration" },
        { type: "row", cmd: "amtool silence add alertname=InstanceDown", desc: "Silence alert via amtool CLI" },
      ],
    },
    {
      title: "Grafana CLI & Administration",
      span: 1,
      blocks: [
        { type: "row", cmd: "grafana-cli plugins list", desc: "List installed plugins" },
        { type: "row", cmd: "grafana-cli plugins install alexandra-track-panel", desc: "Install a community plugin" },
        { type: "row", cmd: "grafana-cli admin reset-admin-password newpwd", desc: "Reset admin password via CLI" },
        { type: "row", cmd: "systemctl restart grafana-server", desc: "Restart Grafana server service" },
        { type: "row", cmd: "tail -f /var/log/grafana/grafana.log", desc: "Monitor Grafana server logs" },
      ],
    },
    {
      title: "Grafana Dashboard Provisioning",
      span: 1,
      blocks: [
        { type: "code", text: "# datasources.yaml config snippet\napiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    access: proxy\n    url: http://localhost:9090\n    isDefault: true\n    editable: false" },
      ],
    },
    {
      title: "LogQL & Loki Reference",
      span: 1,
      blocks: [
        { type: "row", cmd: "{app=\"nginx\"} |= \"error\"", desc: "Filter log streams containing \"error\"" },
        { type: "row", cmd: "{app=\"api\"} != \"info\" | json", desc: "Exclude info, parse JSON fields" },
        { type: "row", cmd: "{app=\"app\"} | regexp \"(?P<ip>\\d+\\.\\d+\\.\\d+\\.\\d+)\"", desc: "Regex extract IP to label field" },
        { type: "row", cmd: "sum(count_over_time({app=\"nginx\"}[5m]))", desc: "Count log lines over last 5 mins" },
        { type: "row", cmd: "rate({job=\"mysql\"}[1m])", desc: "Per-second log line insertion rate" },
      ],
    },
  ],
};

export default data;
