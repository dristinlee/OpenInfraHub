# Contributing

Thanks for helping improve OpenInfraHub.

## Ground Rules

- Do not submit real secrets, private IP addresses, Tailscale IPs, hostnames, internal domains, customer data, company data, logs, screenshots, or service tags.
- Use sample data in examples and tests.
- Keep contributions focused and reviewable.
- Prefer clear documentation and small pull requests.

## Local Workflow

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/OpenInfraHub.git
cd OpenInfraHub
cp .env.example .env
cp docker-compose.example.yml docker-compose.yml
docker compose up -d
```

## Before Opening A Pull Request

Run a local leak check:

```bash
git status --short
git diff --cached
git diff
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' '(api[_-]?key|secret|token|password|passwd|pwd|bearer|authorization|client[_-]?secret|access[_-]?token|refresh[_-]?token|tskey|oauth|jwt|cookie|session|credential|PRIVATE KEY|BEGIN RSA|BEGIN OPENSSH)'
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' '([0-9]{1,3}\.){3}[0-9]{1,3}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|https?://[^[:space:]"<>]+'
```

If a result is expected sample data, explain it in the pull request.

## Issue Labels

Suggested labels:

- `good first issue`
- `documentation`
- `security`
- `integration`
- `docker`
- `monitoring`
- `ui`
- `roadmap`

## Code Style

This project is early. Until a full application stack lands, prioritize:

- Plain language docs.
- Sanitized config examples.
- Small, composable monitoring adapters.
- No hardcoded deployment-specific values.
