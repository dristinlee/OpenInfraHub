# Proxmox Read-Only Proof Of Concept

This proof of concept is intentionally read-only. It is meant to show how OpenInfraHub can collect Proxmox inventory without writing to the cluster or logging secrets.

Script:

```text
scripts/proxmox-readonly-poc.mjs
```

## Environment

Set these environment variables locally:

```bash
export PROXMOX_URL="https://proxmox.example.local:8006"
export PROXMOX_API_TOKEN_ID="user@pve!tokenid"
export PROXMOX_API_TOKEN_SECRET="your-token-secret"
```

Optional:

```bash
export PROXMOX_VERIFY_TLS=true
```

## What It Reads

- `/api2/json/version`
- `/api2/json/nodes`

The output is normalized JSON suitable for later ingestion into OpenInfraHub.

## What It Does Not Do

- No writes to the cluster.
- No VM creation, deletion, or config updates.
- No secret logging.
- No real endpoint publication in the repository.

## Run

```bash
node scripts/proxmox-readonly-poc.mjs > /tmp/proxmox-inventory.json
```

## Safety Notes

- Keep the token in local environment variables or a secret manager.
- Do not commit endpoint URLs or token values.
- If you must test against a self-signed lab certificate, do that only in a private environment.
