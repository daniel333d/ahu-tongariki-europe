import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "rapa-nui-park:visit-count";

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return {
    token,
    url: url.replace(/\/$/, "")
  };
}

async function incrementGlobalCounter() {
  const config = getRedisConfig();

  if (!config) {
    console.warn("Visit counter storage is not configured. Falling back to local browser counter.");
    return null;
  }

  const response = await fetch(`${config.url}/incr/${encodeURIComponent(COUNTER_KEY)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Visit counter increment failed", {
      status: response.status,
      body: errorBody
    });
    return null;
  }

  const payload = (await response.json()) as { result?: number };
  return typeof payload.result === "number" ? payload.result : null;
}

export async function POST() {
  try {
    const count = await incrementGlobalCounter();

    return NextResponse.json(
      {
        count,
        mode: count === null ? "local" : "global"
      },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("Visit counter endpoint failed", error);

    return NextResponse.json(
      {
        count: null,
        mode: "local"
      },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }
}
