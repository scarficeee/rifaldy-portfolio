import { createServer } from "node:http";
import next from "next";
const port = Number(process.env.PORT || 3000);
const app = next({ dev: true, hostname: "127.0.0.1", port, webpack: true });
await app.prepare();
const handle = app.getRequestHandler();
createServer((req, res) => handle(req, res)).listen(port, "127.0.0.1", () =>
  console.log(`Portfolio ready at http://127.0.0.1:${port}`),
);
