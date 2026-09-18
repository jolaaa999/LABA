# Backend — LABA Public API

Go + Gin + GORM. Public content API (`/api/v1`). Frontend Phase 4–7 remains frozen and unwired.

## Official Go version

**Go 1.25.x** (see `go.mod`)

Reason: `github.com/gin-gonic/gin@v1.12` requires Go ≥ 1.25. Pinning older Gin solely to stay on 1.24 was rejected in favor of current stable Gin.

## Prerequisites

- Go 1.25+
- Docker (DB only)

## Databases

| Compose file | Engine | Host port |
|--------------|--------|-----------|
| `docker-compose.dev.yml` | MariaDB 11.4 (fast local) | **3307** |
| `docker-compose.mysql.yml` | MySQL 8.0 (compat target) | **3308** |

```bash
cd backend
cp .env.example .env
# set DB_PORT=3307 (MariaDB) or 3308 (MySQL 8)

docker compose -f docker-compose.dev.yml up -d
# or: docker compose -f docker-compose.mysql.yml up -d

go run ./cmd/server
```

## Dev fixtures (optional)

```bash
APP_ENV=development go run ./cmd/seed-dev
# idempotent; refuses non-development APP_ENV
# fixtures are unpublished / placeholder — never appear on public GET
```

## Tests

```bash
go fmt ./...
go vet ./...
go test ./...
go test -tags=integration ./internal/repository/mysql/...
go build -o bin/server ./cmd/server
```

## Public API

See `../docs/api/public-api.md`.

## Out of scope (default)

Admin, CMS, LMS, uploads. Full member JWT product auth remains deferred.

## Optional: GitHub Discussions board (local OAuth API)

A self-hosted OAuth + Discussions API exists under `/api/v1/auth/*` and `/api/v1/discussions/*`
for local experiments. The public community page uses **giscus** instead (no always-on backend).

To use the API locally, set `GITHUB_CLIENT_*` / `SESSION_SECRET` in `.env` and run `go run ./cmd/server`.
