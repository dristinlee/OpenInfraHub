# Configuration Schema

OpenInfraHub v0.1 uses a small JSON Schema to describe public-safe infrastructure data for demos, tests, imports, and future adapters.

Schema file:

```text
schema/openinfrahub.schema.json
```

The schema is intentionally practical rather than exhaustive. It covers five core sections:

- `nodes`: servers, VMs, containers, workstations, network devices, mobile devices, and storage nodes.
- `services`: monitored applications, dashboards, storage services, network services, and custom endpoints.
- `topology`: networks and edges between nodes, services, and storage.
- `storage`: SMB, NFS, datastore, backup, object, block, and other storage targets.
- `alerts`: generated health, dependency, capacity, or topology findings.

## Root Shape

```json
{
  "schemaVersion": "0.1",
  "metadata": {
    "name": "Sample Lab",
    "description": "Generated public demo inventory",
    "generatedAt": "2026-01-15T12:00:00Z"
  },
  "nodes": [],
  "services": [],
  "topology": {
    "networks": [],
    "edges": []
  },
  "storage": [],
  "alerts": []
}
```

`schemaVersion`, `nodes`, `services`, `topology`, `storage`, and `alerts` are required. `metadata` is optional.

## Generated Example

Use generated values only in this repository. Hostnames should use `.example.local`, and IP examples should use documentation ranges such as `192.0.2.0/24`.

```json
{
  "schemaVersion": "0.1",
  "metadata": {
    "name": "Sample Lab",
    "description": "Generated public demo inventory",
    "generatedAt": "2026-01-15T12:00:00Z"
  },
  "nodes": [
    {
      "id": "node-proxmox-01",
      "name": "Proxmox Node",
      "kind": "server",
      "status": "online",
      "role": "Virtualization host",
      "location": "Lab Rack",
      "managementUrl": "https://proxmox.example.local:8006",
      "interfaces": [
        {
          "name": "mgmt0",
          "type": "ethernet",
          "address": "192.0.2.10",
          "network": "net-lab-mgmt"
        }
      ],
      "resources": {
        "cpuCores": 8,
        "memoryGb": 32
      },
      "tags": [
        "demo",
        "virtualization"
      ]
    }
  ],
  "services": [
    {
      "id": "svc-home-assistant",
      "name": "Home Assistant",
      "kind": "automation",
      "status": "degraded",
      "nodeId": "node-proxmox-01",
      "url": "http://homeassistant.example.local:8123",
      "check": {
        "type": "http",
        "target": "http://homeassistant.example.local:8123",
        "intervalSeconds": 60,
        "timeoutSeconds": 5
      },
      "tags": [
        "demo"
      ]
    }
  ],
  "topology": {
    "networks": [
      {
        "id": "net-lab-mgmt",
        "name": "Lab Management",
        "kind": "management",
        "cidr": "192.0.2.0/24"
      }
    ],
    "edges": [
      {
        "from": "node-proxmox-01",
        "to": "svc-home-assistant",
        "relation": "hosts",
        "description": "Generated service runs on the sample Proxmox node"
      }
    ]
  },
  "storage": [
    {
      "id": "store-files",
      "name": "Files Share",
      "kind": "smb",
      "status": "online",
      "nodeId": "node-proxmox-01",
      "path": "smb://storage.example.local/files",
      "capacityGb": 2048,
      "usedGb": 512,
      "services": [
        "svc-home-assistant"
      ],
      "tags": [
        "demo"
      ]
    }
  ],
  "alerts": [
    {
      "id": "alert-service-degraded",
      "severity": "warning",
      "status": "open",
      "sourceType": "service",
      "sourceId": "svc-home-assistant",
      "title": "Service health check degraded",
      "message": "Generated demo alert for a slow HTTP check.",
      "firstSeen": "2026-01-15T12:15:00Z",
      "lastSeen": "2026-01-15T12:20:00Z",
      "labels": [
        "demo"
      ]
    }
  ]
}
```

## Validation

Validate the schema JSON syntax:

```bash
python3 -m json.tool schema/openinfrahub.schema.json > /tmp/openinfrahub.schema.validated.json
```

Validate an OpenInfraHub config with a JSON Schema validator such as `ajv`:

```bash
ajv validate -s schema/openinfrahub.schema.json -d path/to/config.json
```

## Security Notes

- Do not commit real hostnames, domains, IP addresses, URLs, shares, serial numbers, tokens, customer names, or personal data.
- Use `.example.local` names and documentation-only IP ranges for public examples.
- Keep private runtime configuration outside Git.
