export interface HttpStatusCode {
  code: number;
  name: string;
  description: string;
}

export interface ExitCode {
  code: string;
  name: string;
  description: string;
}

export const httpStatusCodes: HttpStatusCode[] = [
  { code: 100, name: "Continue", description: "Client should continue sending the request body." },
  { code: 101, name: "Switching Protocols", description: "Server is switching protocols per the client's Upgrade header." },
  { code: 200, name: "OK", description: "Request succeeded." },
  { code: 201, name: "Created", description: "Request succeeded and a new resource was created." },
  { code: 202, name: "Accepted", description: "Request accepted for processing, but not completed yet." },
  { code: 204, name: "No Content", description: "Request succeeded, no response body." },
  { code: 206, name: "Partial Content", description: "Server is delivering only part of the resource (range request)." },
  { code: 301, name: "Moved Permanently", description: "Resource has a new permanent URI; clients should update links." },
  { code: 302, name: "Found", description: "Resource temporarily at a different URI." },
  { code: 304, name: "Not Modified", description: "Cached version is still valid — no body returned." },
  { code: 307, name: "Temporary Redirect", description: "Like 302, but the method/body must be preserved on redirect." },
  { code: 308, name: "Permanent Redirect", description: "Like 301, but the method/body must be preserved on redirect." },
  { code: 400, name: "Bad Request", description: "Malformed request syntax or invalid parameters." },
  { code: 401, name: "Unauthorized", description: "Authentication is required and missing or invalid." },
  { code: 403, name: "Forbidden", description: "Authenticated, but not allowed to access this resource." },
  { code: 404, name: "Not Found", description: "Resource doesn't exist at this URI." },
  { code: 405, name: "Method Not Allowed", description: "HTTP method used isn't supported for this resource." },
  { code: 408, name: "Request Timeout", description: "Server timed out waiting for the request." },
  { code: 409, name: "Conflict", description: "Request conflicts with the current state of the resource." },
  { code: 410, name: "Gone", description: "Resource existed but has been permanently removed." },
  { code: 413, name: "Payload Too Large", description: "Request body exceeds the server's size limit." },
  { code: 414, name: "URI Too Long", description: "Request URI exceeds the server's length limit." },
  { code: 415, name: "Unsupported Media Type", description: "Request body format isn't supported by the server." },
  { code: 422, name: "Unprocessable Entity", description: "Well-formed request, but semantically invalid (e.g. failed validation)." },
  { code: 425, name: "Too Early", description: "Server is unwilling to process a request that might be replayed." },
  { code: 429, name: "Too Many Requests", description: "Client has sent too many requests in a given time (rate limited)." },
  { code: 431, name: "Request Header Fields Too Large", description: "Header section is too large for the server to process." },
  { code: 451, name: "Unavailable For Legal Reasons", description: "Resource is unavailable due to a legal demand." },
  { code: 500, name: "Internal Server Error", description: "Generic server-side failure with no more specific code." },
  { code: 501, name: "Not Implemented", description: "Server doesn't support the functionality required." },
  { code: 502, name: "Bad Gateway", description: "Upstream server (proxy/gateway target) returned an invalid response." },
  { code: 503, name: "Service Unavailable", description: "Server is temporarily overloaded or down for maintenance." },
  { code: 504, name: "Gateway Timeout", description: "Upstream server (proxy/gateway target) didn't respond in time." },
  { code: 507, name: "Insufficient Storage", description: "Server can't store the representation needed to complete the request." },
  { code: 508, name: "Loop Detected", description: "Server detected an infinite loop while processing the request." },
];

export const exitCodes: ExitCode[] = [
  { code: "0", name: "Success", description: "Command completed successfully." },
  { code: "1", name: "General error", description: "Catch-all for miscellaneous errors — an uncaught exception, generic failure." },
  { code: "2", name: "Misuse of shell built-in", description: "Incorrect usage, e.g. wrong number of arguments to a built-in command." },
  { code: "126", name: "Command cannot execute", description: "File found but isn't executable, or a permission issue." },
  { code: "127", name: "Command not found", description: "Typo'd command name, or it isn't installed / not on $PATH." },
  { code: "128", name: "Invalid exit argument", description: "`exit` was called with a non-integer or out-of-range argument." },
  { code: "128+N", name: "Terminated by signal N", description: "Process was killed by signal N — exit code is 128 + the signal number." },
  { code: "129", name: "SIGHUP (1)", description: "Terminal disconnected, or the controlling process hung up." },
  { code: "130", name: "SIGINT (2)", description: "Interrupted — usually Ctrl+C." },
  { code: "131", name: "SIGQUIT (3)", description: "Quit signal, typically with a core dump." },
  { code: "134", name: "SIGABRT (6)", description: "Process called abort() — often an assertion failure." },
  { code: "137", name: "SIGKILL (9)", description: "Force-killed — extremely common for OOM-killed containers." },
  { code: "139", name: "SIGSEGV (11)", description: "Segmentation fault — invalid memory access." },
  { code: "141", name: "SIGPIPE (13)", description: "Wrote to a pipe with no reader on the other end." },
  { code: "143", name: "SIGTERM (15)", description: "Graceful termination request — the default signal for `kill` and container stop." },
  { code: "255", name: "Exit status out of range", description: "Exit code was outside 0–255, or the command exited abnormally without a clean status." },
];
