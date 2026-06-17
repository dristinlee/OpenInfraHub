# Screenshots

Screenshots are useful for reviewers, contributors, and users, but they are also the easiest way to leak infrastructure details.

## Do Not Publish Screenshots Showing

- Real LAN IP addresses.
- Tailscale IP addresses.
- Public IP addresses.
- Hostnames, internal DNS names, custom domains, or URLs.
- Admin panels with session state.
- QR codes.
- Emails, personal names, client names, or company names.
- Device serials, service tags, license keys, or asset tags.
- SMB paths or storage names that identify private systems.
- Alerts containing real hostnames or incident details.

## Safe Screenshot Workflow

1. Use generated sample data.
2. Use `.example.local` hostnames.
3. Use fake node names such as `proxmox-node-01`, `edge-node-01`, and `storage-01`.
4. Crop browser chrome if it contains URLs or profiles.
5. Review at 200 percent zoom before committing.
6. Run OCR if possible.

## Recommended Public Screenshots

- `docs/assets/dashboard-desktop.png`
- `docs/assets/dashboard-mobile.png`
- `docs/assets/topology-sample.png`
- `docs/assets/inventory-sample.png`
- `docs/assets/alerts-sample.png`

## README Copy

Use this in the README after screenshots are cleaned:

```markdown
## Screenshots

| Desktop dashboard | Mobile operations view |
| --- | --- |
| ![Desktop dashboard](docs/assets/dashboard-desktop.png) | ![Mobile dashboard](docs/assets/dashboard-mobile.png) |

| Topology map | Alerts |
| --- | --- |
| ![Topology map](docs/assets/topology-sample.png) | ![Alerts](docs/assets/alerts-sample.png) |
```
