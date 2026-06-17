# ASAP Public Release Checklist

## Security Findings From Local Audit

Do not publish the existing `Z/homepage` Git history.

Found public-release blockers:

- `config/services.yaml` contains real LAN IPs, Tailscale IPs, service links, SMB paths, device names, and personal hostnames.
- `config/bookmarks.yaml` contains real service URLs.
- `docker-compose.yaml` contains real allowed host IPs.
- `config/logs/homepage.log` contains many private service URLs and connection errors.
- `config/services.yaml.bak-20260617-zephyrus` contains backup copies of private service data.
- Git history repeats the same private IPs, Tailscale IPs, service URLs, SMB paths, and logs across auto-backup commits.

Conclusion: launch from a clean new repository using sanitized examples. Do not push `Z/homepage` or its `.git` history.

## Today

### 1. Create Clean Public Repo Folder

```bash
cd ~
cp -R OpenInfraHub OpenInfraHub-public
cd OpenInfraHub-public
```

### 2. Confirm No Private Git History

```bash
test ! -d .git && echo "OK: no git history yet"
```

### 3. Run Local Secret And Infrastructure Scan

```bash
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' '(api[_-]?key|secret|token|password|passwd|pwd|bearer|authorization|client[_-]?secret|access[_-]?token|refresh[_-]?token|tskey|oauth|jwt|cookie|session|credential|PRIVATE KEY|BEGIN RSA|BEGIN OPENSSH)'
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' '([0-9]{1,3}\.){3}[0-9]{1,3}|100\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|https?://[^[:space:]"<>]+'
```

Expected results should be sample values only, such as `example.local`, `localhost`, `127.0.0.1`, `github.com/YOUR_GITHUB_USERNAME`, and official docs/admin URLs.

### 4. Initialize New Git History

```bash
git init
git add .
git status --short
git commit -m "Initial public OpenInfraHub release"
```

### 5. Create GitHub Repo

Using GitHub CLI:

```bash
gh repo create OpenInfraHub --public --source=. --remote=origin --push --description "Self-hosted infrastructure command center for homelabs, small teams, technicians, and MSP-style environments"
```

Manual fallback:

```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/OpenInfraHub.git
git branch -M main
git push -u origin main
```

### 6. Add GitHub Topics

Use these topics:

```text
self-hosted, homelab, infrastructure, monitoring, proxmox, tailscale, docker, dashboard, devops, sysadmin, msp, uptime, topology, home-assistant
```

### 7. Create Issues

Copy issue titles and bodies from [ISSUES.md](ISSUES.md).

## Next 48 Hours

- Replace placeholder screenshot section with generated sample screenshots.
- Add `docs/assets/` with redacted sample images only.
- Add `v0.1.0-docs-preview` release tag.
- Add a GitHub Discussion introduction post.
- Add a simple CI workflow for Markdown linting and secret scanning.
- Open issues for Proxmox, Tailscale, Uptime Kuma, Docker, topology, and plugin work.
- Write a short release note explaining that this is a public-safe extraction from a private deployment.

Commands:

```bash
git tag v0.1.0-docs-preview
git push origin v0.1.0-docs-preview
gh release create v0.1.0-docs-preview --title "v0.1.0 docs preview" --notes "Initial public-safe OpenInfraHub documentation and sanitized configuration examples."
```

## Next 7 Days

- Build a public demo mode with generated sample data.
- Add Docker install verification.
- Add typed config schema.
- Add first Proxmox adapter proof of concept.
- Add first Tailscale inventory adapter proof of concept.
- Add screenshots after redaction review.
- Apply for Codex for OSS using [CODEX_FOR_OSS.md](CODEX_FOR_OSS.md).
- Post to relevant self-hosting/homelab communities with the security-first angle.

## What To Remove From Private Source Before Any Future Extraction

- `config/logs/`
- `*.bak*`
- real `config/services.yaml`
- real `config/bookmarks.yaml`
- real `docker-compose.yaml`
- any screenshots captured from the private deployment
- any Git history from the private repo
