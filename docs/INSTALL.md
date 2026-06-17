# Install

## Requirements

- Docker
- Docker Compose v2
- A machine that can reach the services you want to display

## Local Preview

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/OpenInfraHub.git
cd OpenInfraHub
cp .env.example .env
cp docker-compose.example.yml docker-compose.yml
docker compose up -d
docker compose ps
```

Open:

```text
http://localhost:3000
```

## Configure Services

Edit local copies only:

```bash
mkdir -p config/private
cp -R config/examples/* config/private/
```

Then update your `docker-compose.yml` volume:

```yaml
volumes:
  - ./config/private:/app/config:ro
```

Do not commit `config/private`.

## Stop

```bash
docker compose down
```

## Public Repo Rule

The public repo should contain only examples and sample data. Real operational config belongs in private storage.
