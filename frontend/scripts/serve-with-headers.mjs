// Minimal static server for frontend/dist that applies public/_headers rules,
// so the Content-Security-Policy can be tested locally before deploying.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = new URL("../dist", import.meta.url).pathname;
const headersFile = fs.readFileSync(path.join(root, "_headers"), "utf8");
const extra = {};
for (const line of headersFile.split("\n")) {
  const m = line.match(/^\s+([A-Za-z-]+):\s*(.+)$/);
  if (m) extra[m[1]] = m[2];
}
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".ico": "image/x-icon", ".woff2": "font/woff2" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(root, p);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) file = path.join(root, "index.html");
  for (const [k, v] of Object.entries(extra)) res.setHeader(k, v);
  res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
}).listen(8788, () => console.log("csp preview on http://localhost:8788"));
