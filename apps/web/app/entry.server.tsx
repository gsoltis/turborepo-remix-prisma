import fs from "fs";
import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";

console.log(process.cwd());
const p =
  __dirname + "../../../../../node_modules/clients/prisma/schema.prisma";
const r = fs.realpathSync(p);
console.log(r);
const f = fs.readFileSync(r);
console.log(f.length);

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
