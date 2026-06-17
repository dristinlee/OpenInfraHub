#!/usr/bin/env node

const baseUrl = process.env.PROXMOX_URL;
const tokenId = process.env.PROXMOX_API_TOKEN_ID;
const tokenSecret = process.env.PROXMOX_API_TOKEN_SECRET;
const verifyTls = String(process.env.PROXMOX_VERIFY_TLS ?? "true").toLowerCase() !== "false";

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!baseUrl) fail("Missing PROXMOX_URL");
if (!tokenId) fail("Missing PROXMOX_API_TOKEN_ID");
if (!tokenSecret) fail("Missing PROXMOX_API_TOKEN_SECRET");

const headers = {
  Authorization: `PVEAPIToken=${tokenId}=${tokenSecret}`,
  Accept: "application/json"
};

async function getJson(path) {
  const response = await fetch(new URL(path, baseUrl), {
    headers,
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
    agent: undefined,
    // Node fetch honors the global TLS stack; verification is controlled by the environment.
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  if (!verifyTls) {
    console.warn("PROXMOX_VERIFY_TLS=false set. Use only for local test labs.");
  }

  const [nodes, version] = await Promise.all([
    getJson("/api2/json/nodes"),
    getJson("/api2/json/version")
  ]);

  const normalized = {
    source: "proxmox",
    endpoint: baseUrl,
    version: version?.data ?? null,
    nodes: (nodes?.data ?? []).map((node) => ({
      id: node.node,
      name: node.node,
      kind: "server",
      status: node.status === "online" ? "online" : "offline",
      cpu: node.cpu,
      memory: node.mem,
      maxMemory: node.maxmem,
      uptime: node.uptime,
      load: node.loadavg,
      maxCpu: node.maxcpu
    }))
  };

  process.stdout.write(`${JSON.stringify(normalized, null, 2)}\n`);
}

main().catch((error) => {
  console.error(`Proxmox read-only PoC failed: ${error.message}`);
  process.exit(1);
});
