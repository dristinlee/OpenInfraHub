# Security Policy

OpenInfraHub describes infrastructure, so accidental disclosure risk is high.

## Supported Versions

The project is pre-1.0. Security fixes apply to the latest public branch and releases.

## Reporting A Vulnerability

Open a private security advisory on GitHub if available. If private advisories are not enabled yet, email the maintainer and include:

- A short description of the issue.
- Impact.
- Reproduction steps.
- Whether any secret, IP address, hostname, screenshot, log, or private data was exposed.

Do not open public issues for active secrets or private infrastructure details.

## What Not To Commit

- `.env` files.
- API keys, passwords, tokens, OAuth secrets, SSH keys, certificates, cookies, or session values.
- Real IP addresses, Tailscale IPs, DNS names, hostnames, domains, or URLs.
- Production logs.
- Screenshots with admin URLs, topology details, names, emails, serials, QR codes, or service tags.
- Company, client, customer, ticketing, billing, or proprietary workflow data.

## Required Public Release Scan

Run this before every release:

```bash
git status --short
git log --oneline --decorate -n 20
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' '(api[_-]?key|secret|token|password|passwd|pwd|bearer|authorization|client[_-]?secret|access[_-]?token|refresh[_-]?token|tskey|oauth|jwt|cookie|session|credential|PRIVATE KEY|BEGIN RSA|BEGIN OPENSSH)'
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' '([0-9]{1,3}\.){3}[0-9]{1,3}|100\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|https?://[^[:space:]"<>]+'
```

For stronger history scanning, install and run both:

```bash
gitleaks detect --source . --verbose
trufflehog git file://. --only-verified
```
