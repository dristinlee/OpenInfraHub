# Architecture

OpenInfraHub starts as a safe public version of a real private infrastructure console.

## Principles

- Public repo contains code, examples, sample data, and docs only.
- Runtime config stays local and private.
- Monitoring adapters should be optional and scoped.
- The UI should be useful on mobile first.
- Integrations should fail closed and avoid logging secrets.

## Current Public Architecture

```text
Browser
  |
  v
Docker Compose
  |
  v
Homepage-compatible dashboard container
  |
  v
Sanitized YAML examples
```

## Planned Architecture

```text
Browser / Mobile Browser
  |
  v
OpenInfraHub Web UI
  |
  v
API Layer
  |
  +-- Inventory Store
  +-- Alert Engine
  +-- Topology Model
  +-- Plugin Adapter Runtime
       |
       +-- Proxmox Adapter
       +-- Tailscale Adapter
       +-- Uptime Kuma Adapter
       +-- Docker Adapter
       +-- Home Assistant Adapter
       +-- Generic HTTP Adapter
```

## Data Model Draft

- `Node`: host, VM, container, workstation, network device, mobile device, or storage target.
- `Service`: monitored endpoint or application.
- `Interface`: network attachment, VPN state, or management endpoint.
- `Check`: health check result.
- `Alert`: degraded/offline/high-risk state.
- `TopologyEdge`: relationship between nodes, networks, services, and storage.

## Security Model Draft

- Secrets are injected through environment variables or secret managers.
- Public examples use `.example.local` hostnames only.
- Logs redact URLs, headers, tokens, emails, and IPs.
- Screenshots use generated sample data.
- CI includes secret scanning before release.
