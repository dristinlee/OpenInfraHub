# Infrastructure Redaction Guide

OpenInfraHub is public OSS. Anything that identifies a real deployment should be removed before publishing screenshots, YAML, logs, or exports.

## Redact Before Publishing

- Real IP addresses, including private LAN ranges and Tailscale addresses.
- Hostnames, internal DNS names, custom domains, and admin URLs.
- API keys, passwords, tokens, cookies, session IDs, SSH keys, certificates, and service secrets.
- Customer, company, personal, or ticket data.
- Device serials, asset tags, service tags, and QR codes.
- SMB shares, NFS exports, storage labels, and backup names that identify the site.
- Logs showing private URLs, authentication failures, or connection strings.

## Safe Public Replacements

- Use `example.local` for hostnames.
- Use documentation-only IP ranges such as `192.0.2.0/24`, `198.51.100.0/24`, and `203.0.113.0/24`.
- Use synthetic names like `node-alpha`, `node-beta`, `demo-nas`, and `lab-router`.
- Use generic labels like `Sample Lab`, `Public Demo`, or `Demo Environment`.

## Workflow

1. Export or screenshot the real data only if needed for private review.
2. Replace names and addresses with generated placeholders.
3. Crop browser chrome if it shows URLs, profiles, or account state.
4. Run OCR or visually inspect the capture at 200 percent zoom.
5. Search the exported text for private terms before committing.
6. Keep private runtime config outside Git.

## Quick Checks

Use these searches before a public release:

```bash
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' '192\\.168\\.|100\\.[0-9]{1,3}\\.|Dristin|Padgett|AIS|T130|Zephyrus|iPhone|RTX|BGW|ExpertWiFi|Nighthawk|PRIVATE KEY|BEGIN OPENSSH|api[_-]?key|password|token|secret' .
```

If the scan finds a real identifier, treat it as a release blocker.
