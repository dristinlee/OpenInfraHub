# OpenInfraHub

OpenInfraHub is a self-hosted infrastructure command center for homelabs, small teams, technicians, and MSP-style environments.

It turns scattered infrastructure notes, dashboards, and service links into one operations surface for node inventory, service monitoring, Proxmox/LXC visibility, Tailscale-aware fleet tracking, topology mapping, storage telemetry, alerts, and mobile-first infrastructure checks.

This repository is the public OSS version of a real deployed homelab operations console. Private hostnames, IP addresses, logs, screenshots, customer data, company data, and credentials are intentionally excluded.

## Who It Is For

- Homelab users running Proxmox, Linux servers, containers, NAS shares, and self-hosted services.
- Technicians who need a fast mobile view of service state, topology, and device health.
- Small teams that want a lightweight infrastructure register without buying a full enterprise monitoring suite.
- Self-hosters who use Tailscale, Caddy, Home Assistant, Uptime Kuma, Gitea, Guacamole, SMB storage, or similar tools.

## Current Status

OpenInfraHub is in early public preview. The first release focuses on safe, generic configuration, documentation, a static demo mode, and a clean install path. The original private deployment is not published directly because it contains private network details.

## Public Demo

A static sample-data demo is available in [`demo/`](demo/). It uses generated infrastructure names, documentation-safe IP ranges, and fake service states only.

Open it locally:

```bash
cd OpenInfraHub
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080/demo/
```

The demo is intentionally static so reviewers and contributors can inspect the product direction without requiring access to private infrastructure, API tokens, Proxmox, Tailscale, or monitoring services.

## Features

- Node inventory for servers, workstations, network devices, mobile devices, and storage.
- Service monitoring links for Proxmox, Home Assistant, Caddy, Gitea, Guacamole, Uptime Kuma, and SMB-backed storage.
- Proxmox and LXC-aware infrastructure sections.
- Tailscale-aware fleet tracking using sanitized examples.
- Topology map documentation for a home or small-office network.
- Storage telemetry placeholders for SMB/NAS/datastore capacity.
- Alert and incident checklist for offline nodes, degraded services, and high resource use.
- Mobile-first operations UI based on self-hosted dashboard patterns.
- Future plugin support for monitoring adapters.
- Public demo mode using generated sample data.

## Screenshots

Screenshots are intentionally not committed yet.

Before adding screenshots, review [docs/SCREENSHOTS.md](docs/SCREENSHOTS.md). Every screenshot must be cleaned so it does not expose:

- Public IPs, private IPs, Tailscale IPs, hostnames, domains, or URLs.
- Personal names, company names, client names, ticket data, emails, or device serials.
- API keys, tokens, cookies, QR codes, service tags, or admin panels.

Recommended first screenshot set:

- Desktop dashboard with sample data only.
- Mobile dashboard with sample data only.
- Sanitized topology map.
- Example node inventory.
- Example alert state.

## Quick Start

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/OpenInfraHub.git
cd OpenInfraHub
cp .env.example .env
cp docker-compose.example.yml docker-compose.yml
docker compose up -d
```

Open the dashboard:

```text
http://localhost:3000
```

Do not paste your real infrastructure config into a public repo. Keep private runtime config outside Git.

## Tech Stack

Initial public release:

- Docker Compose
- Homepage-compatible dashboard configuration examples
- YAML configuration
- Markdown documentation

Planned:

- TypeScript dashboard frontend
- Adapter-based monitoring collectors
- Proxmox API integration
- Tailscale device inventory integration
- Uptime Kuma import support
- SQLite or Postgres metadata store

## Repository Layout

```text
.
|-- README.md
|-- LICENSE
|-- CONTRIBUTING.md
|-- SECURITY.md
|-- ROADMAP.md
|-- .env.example
|-- docker-compose.example.yml
|-- demo/
|-- config/examples/
|-- docs/
`-- .github/ISSUE_TEMPLATE/
```

## Security Warning

OpenInfraHub is meant to describe and monitor infrastructure. That means it can easily expose sensitive details if used carelessly.

Never commit:

- `.env` files.
- API keys, passwords, tokens, cookies, session values, or SSH keys.
- Real LAN IP addresses, Tailscale IPs, hostnames, domains, SMB paths, or admin URLs.
- Logs from production services.
- Screenshots from real admin panels unless fully redacted.
- Company, client, customer, or internal workflow data.

Use this public repository for code, examples, documentation, and sample data only.

## Why This Project Matters

Many homelab users and small operators run real infrastructure without the budget or time for enterprise tooling. They still need to understand what is online, what changed, what is degraded, and where services live.

OpenInfraHub aims to make that operational picture approachable: one self-hosted command center that is understandable, mobile-friendly, and extensible.

## AI/Codex Use In Development

AI coding tools are used to accelerate development, documentation, security review, test planning, and refactoring. The maintainer uses AI assistance to move faster while still reviewing generated changes manually and keeping sensitive deployment data out of the public repository.

Planned AI-assisted work includes:

- Building repeatable install docs and Docker examples.
- Writing tests for monitoring adapters.
- Refactoring private deployment ideas into generic OSS code.
- Creating sample data and redacted demo screenshots.
- Improving accessibility and mobile usability.

## Maintainer Statement

This project is maintained by a self-taught builder turning a real private infrastructure console into a safe, reusable open-source tool. The goal is to help self-hosters, technicians, small businesses, and homelab users manage infrastructure without exposing private operational data.

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## License

MIT. See [LICENSE](LICENSE).
