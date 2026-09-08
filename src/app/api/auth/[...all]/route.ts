import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "../../../../auth/server";

async function getHandlers() {
  return toNextJsHandler(await getAuth());
}

export async function GET(request: Request) {
  return (await getHandlers()).GET(request);
}

export async function POST(request: Request) {
  return (await getHandlers()).POST(request);
}
