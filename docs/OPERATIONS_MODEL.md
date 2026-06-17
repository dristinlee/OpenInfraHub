# Operations Model

This document captures the v0.1 public-safe data model and the first adapter boundaries for OpenInfraHub.

## Core Data Model

OpenInfraHub uses five primary objects:

- `nodes`: servers, VMs, containers, workstations, network devices, storage, and mobile devices.
- `services`: monitored applications and endpoints.
- `topology`: networks and edges between nodes and services.
- `storage`: SMB, NFS, block, object, backup, or datastore targets.
- `alerts`: health, dependency, capacity, and topology findings.

The formal JSON Schema lives in [schema/openinfrahub.schema.json](../schema/openinfrahub.schema.json).

## Topology Conventions

- Nodes represent physical or logical endpoints.
- Services hang off the node that hosts them.
- Storage can connect to nodes and services.
- Edges should describe the relationship, not just the existence of a link.

Example edge types:

- `hosts`
- `connects-to`
- `depends-on`
- `backs-up-to`
- `routes-through`

## Sample Storage Telemetry

Keep sample storage data simple and readable:

- `id`
- `name`
- `kind`
- `status`
- `nodeId`
- `path`
- `capacityGb`
- `usedGb`
- `services`
- `tags`

Suggested status values:

- `online`
- `warning`
- `degraded`
- `offline`
- `maintenance`

## Alert Severity Model

Use a small severity ladder:

- `info`
- `warning`
- `critical`
- `offline`
- `maintenance`

Alert records should include:

- `id`
- `severity`
- `status`
- `sourceType`
- `sourceId`
- `title`
- `message`
- `firstSeen`
- `lastSeen`
- `labels`

## Adapter Boundaries

### Proxmox

The first Proxmox adapter should be read-only and should capture:

- node name
- VM and LXC inventory
- CPU and memory usage
- uptime
- optional temperature
- storage backing where exposed

Never log tokens, endpoint URLs, or raw API responses in public samples.

### Tailscale

The first Tailscale adapter should import:

- device name
- online state
- last seen time
- tags
- routes
- OS
- address list

Keep public examples sanitized and use sample JSON for demos.

### Uptime Kuma

OpenInfraHub should treat Uptime Kuma as a source of monitor state, not as the source of truth for all infrastructure metadata.

Import:

- monitor name
- status
- latency
- group
- tags
- recent incident notes

### Generic HTTP Checks

The generic HTTP adapter should support:

- URL
- expected status code
- timeout
- TLS warning state
- label

This keeps the first implementation small and lets other adapters reuse the same status display model.

### Plugin Architecture

Keep plugin boundaries narrow:

- configuration
- polling
- status normalization
- error handling
- UI display contract

Each adapter should return the same normalized shapes so the UI does not need per-integration special cases.

## Public Example Files

Sample files live under `config/examples/` and are safe for public review:

- `config/examples/topology.yaml`
- `config/examples/storage.yaml`
- `config/examples/alerts.yaml`
- `config/examples/tailscale.yaml`

These are documentation examples only, not production configs.
