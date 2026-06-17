# Install

## Requirements

- Docker
- Docker Compose v2
- A machine that can reach the services you want to display

## Static Demo Preview

The static demo does not require Docker or private infrastructure:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/OpenInfraHub.git
cd OpenInfraHub
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080/demo/
```

Use this mode for public screenshots and reviews.

## Container Preview

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

Expected health check:

```bash
docker inspect --format '{{json .State.Health}}' openinfrahub
```

The container should report `healthy` after startup. If it stays `starting`, wait a minute and rerun the command. If it reports `unhealthy`, inspect logs:

```bash
docker compose logs --tail=100 openinfrahub
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
