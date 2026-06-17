# Initial GitHub Issues

## 1. Add sanitized desktop dashboard screenshot

Labels: `documentation`, `good first issue`

Create a desktop screenshot using generated sample data only. Do not use real IP addresses, Tailscale addresses, hostnames, domains, personal names, company names, or admin panels.

## 2. Add sanitized mobile dashboard screenshot

Labels: `documentation`, `good first issue`

Create a mobile screenshot that shows the operations UI on a narrow viewport with sample nodes, sample services, and fake alert states.

## 3. Add secret scanning GitHub Action

Labels: `security`

Add CI that runs a secret scan on pull requests and pushes. The first version can use Gitleaks or TruffleHog with a minimal configuration.

## 4. Add infrastructure data redaction guide

Labels: `security`, `documentation`

Write a practical guide for redacting screenshots, YAML config, logs, hostnames, IP addresses, and Tailscale data before publishing.

## 5. Create sample node inventory schema

Labels: `documentation`, `monitoring`

Define the first JSON or YAML schema for nodes, including type, status, role, labels, location, service links, and health checks.

## 6. Design Proxmox integration adapter

Labels: `integration`, `proxmox`

Draft the adapter interface for Proxmox nodes, VMs, LXC containers, CPU, memory, disk, uptime, and temperature where available.

## 7. Build Proxmox read-only proof of concept

Labels: `integration`, `proxmox`

Create a read-only Proxmox collector using environment-provided API tokens. It must not log token values or commit real endpoints.

## 8. Design Tailscale fleet integration

Labels: `integration`, `tailscale`

Draft how OpenInfraHub should import Tailscale devices, online state, advertised routes, OS, last seen time, and tags.

## 9. Build Tailscale sample data importer

Labels: `integration`, `tailscale`, `good first issue`

Create an importer that reads sanitized Tailscale-like sample JSON and displays device inventory without requiring a real API key.

## 10. Add topology map data model

Labels: `topology`, `documentation`

Define nodes and edges for gateway, switch, server, VM, container, storage, VPN, and service relationships.

## 11. Add topology map UI prototype

Labels: `topology`, `ui`

Build a prototype topology view using sample data. It should work on desktop and be readable on mobile.

## 12. Add Docker deployment guide

Labels: `docker`, `documentation`, `good first issue`

Improve `docs/INSTALL.md` with production deployment notes, volume layout, backup notes, and private config handling.

## 13. Add Docker Compose health check

Labels: `docker`

Add a health check to the example Compose file or document the recommended health check for the container.

## 14. Add Uptime Kuma integration design

Labels: `integration`, `monitoring`

Document how OpenInfraHub should import monitors, groups, status, latency, and incidents from Uptime Kuma.

## 15. Add generic HTTP monitoring adapter design

Labels: `monitoring`

Design a simple adapter for URL checks, expected status codes, timeout, TLS warning state, and display labels.

## 16. Add storage telemetry sample

Labels: `monitoring`, `good first issue`

Add sample storage data for total, used, free, mount path, share type, and alert thresholds.

## 17. Add alert severity model

Labels: `monitoring`, `documentation`

Define severity levels such as info, warning, critical, offline, degraded, and maintenance.

## 18. Add plugin architecture proposal

Labels: `roadmap`, `integration`

Write a proposal for adapters/plugins, including configuration, secrets, polling, error handling, and UI display contracts.

## 19. Add public demo mode

Labels: `ui`, `good first issue`

Create a mode that runs entirely on generated sample data so users and reviewers can see the project without private infrastructure.

## 20. Add accessibility pass for mobile operations UI

Labels: `ui`, `good first issue`

Review color contrast, tap targets, keyboard navigation, focus state, and responsive layout for mobile operations use.
