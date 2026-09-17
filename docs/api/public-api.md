# Public API Contract — Phase 8B

> Version: `v1`  
> Base path: `/api/v1`  
> JSON naming: **camelCase** (Phase 8A compatible)  
> Status: Stable public content contract — **Frontend must not consume until Phase 8E.**

## Envelope

Success:

```json
{ "data": { } }
```

```json
{ "data": [ ] }
```

Error:

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project not found"
  }
}
```

---

## Wire enums

| Domain | Domain (DB) | Wire (JSON) |
|--------|-------------|-------------|
| ProjectCategory | `AI_ENGINEERING` | `ai-engineering` |
| | `RESEARCH` | `research` |
| | `DEVELOPER_TOOL` | `developer-tool` |
| | `OPEN_SOURCE` | `open-source` |
| | `COMPETITION` | `competition` |
| ProjectStatus | `ACTIVE` / `SHARED` / `DRAFT` / `ARCHIVED` | `active` / `shared` / `draft` / `archived` |
| EventFormat | `WORKSHOP` / `READ` / `BUILD` / `SHARE` | `workshop` / `read` / `build` / `share` |
| ContributionMode | `BUILD` / `RESEARCH` / `EXPLAIN` / `DOCUMENT` / `CONNECT` | `build` / `research` / `explain` / `document` / `connect` |
| RecruitingStatus | `NOT_PUBLISHED` / `PUBLISHED` | `not-published` / `published` |
| Persona (derived) | from category | `engineering` / `research` / `tool` |

Category **query** accepts wire values only:  
`ai-engineering` | `research` | `developer-tool` | `open-source` | `competition` | `tool` | `tools`  

`tool` / `tools` = archive filter → `DEVELOPER_TOOL` **or** `OPEN_SOURCE`.

---

## GET /api/v1/health

**200** `{ "data": { "status": "ok" } }` — process alive (no DB).

## GET /api/v1/ready

**200** `{ "data": { "status": "ready", "database": "ok" } }`  
**503** `NOT_READY` when DB unreachable (never `200` with ready:false).

---

## GET /api/v1/projects

**Visibility:** `published=true` AND `placeholder=false`

**Order:** `featured DESC`, `sort_order ASC`, `year DESC`, `title ASC`

**Featured invariant (response):** at most one `featured=true` — first featured row after sort wins; others demoted in the public DTO.

**Query:** `category` (optional) — invalid → **400** `INVALID_CATEGORY`

**Public fields:** `id`, `slug`, `title`, `summary`, `category`, `year`, `status`, `featured`, `persona`

**Never exposed:** `placeholder`, `published`, `sortOrder`, timestamps, case-study body.

**Empty:** `200` `{ "data": [] }`

### Example

```json
{
  "data": [
    {
      "id": "00000000-0000-4000-8000-0000000000a1",
      "slug": "example-project",
      "title": "Example Project",
      "summary": "Illustrative metadata only.",
      "category": "research",
      "year": "2026",
      "status": "active",
      "featured": true,
      "persona": "research"
    }
  ]
}
```

---

## GET /api/v1/projects/:slug

**Visibility:** same as list. Unpublished / placeholder / missing → **404** `PROJECT_NOT_FOUND` (identical; no draft leakage).

**Invalid slug syntax** → **400** `INVALID_SLUG`

**Public fields:** same as list item (+ `persona`). Case study editorial body remains frontend-static; use `slug` + `persona` to match local content in Phase 8E.

---

## GET /api/v1/events

**Visibility:** `published=true`

**Default scope:** `upcoming` (future + ongoing).  
Query `?scope=upcoming` | `?scope=all`  
Invalid → **400** `INVALID_EVENT_SCOPE`

**Upcoming rule:** not clearly ended before now UTC  
`(ends_at IS NOT NULL AND ends_at >= now) OR (ends_at IS NULL AND (starts_at IS NULL OR starts_at >= now))`

**Order:** `starts_at ASC` (nulls last)

**Timestamps:** RFC3339 UTC strings (`startsAt`, `endsAt`).

**Format wire:** `workshop` | `read` | `build` | `share`

**Empty:** `200` `{ "data": [] }` — valid (“Schedule not published yet”).

---

## GET /api/v1/community/members

**Visibility:** `public_profile=true` AND `placeholder=false`

**Order:** `sort_order ASC`, `display_name ASC`

**Public fields:** `id`, `slug`, `displayName`, `headline`, `bio`, `contributionModes`

**Never exposed:** `sortOrder`, `publicProfile`, `placeholder`, auth refs.

Unknown contribution mode in DB → **500** (data error), not silent pass-through.

**Empty:** `200` `{ "data": [] }`

---

## GET /api/v1/recruiting/status

| Status wire | Allowed fields | Forbidden |
|-------------|----------------|-----------|
| `not-published` | `status`, `headline?`, `description?` | `contactType`, `contactValue`, `publishedAt` |
| `published` | above + optional `contactType` / `contactValue` | invented contacts |

Contact is **optional** even when published (offline entry allowed).  
Service strips contact whenever status is not published — even if DB has stale values.

### Example NOT_PUBLISHED

```json
{
  "data": {
    "status": "not-published",
    "headline": "Public recruiting details are not published yet.",
    "description": "Formal recruiting details will appear when they are ready to be public."
  }
}
```

---

## Errors

| HTTP | code |
|------|------|
| 400 | `INVALID_CATEGORY`, `INVALID_SLUG`, `INVALID_EVENT_SCOPE` |
| 404 | `PROJECT_NOT_FOUND`, `NOT_FOUND` |
| 500 | `INTERNAL_ERROR` |
| 503 | `NOT_READY` |

---

## Frontend Consumer Matrix (Phase 8E prep — not wired yet)

| Consumer | Needs from API |
|----------|----------------|
| **Projects Archive / Featured** | `slug`, `title`, `summary`, `category`, `year`, `featured`, `status`, `persona` |
| **Project Detail shell** | metadata above; case study body stays local matched by `slug` + `persona` |
| **Events schedule** | `slug`, `title`, `format`, `summary`, `startsAt`, `endsAt`, `locationText` (empty OK) |
| **Community roster** | `slug`, `displayName`, `headline`, `bio`, `contributionModes` (empty OK) |
| **Join entry status** | `status`, safe `headline`/`description`; no contact when `not-published` |

Event **formats** (Workshop/Read/Build/Share editorial copy) remain frontend static; API returns concrete sessions only.

---

## Dev fixtures

```bash
APP_ENV=development go run ./cmd/seed-dev
```

- Idempotent by slug  
- Projects/events/members: unpublished / placeholder  
- Recruiting: `NOT_PUBLISHED`  
- Refused when `APP_ENV` is not development/dev/local  
- Server startup never auto-seeds

---

## Integration tests

```bash
go test ./...                                 # unit + contract (no DB required)
go test -tags=integration ./internal/repository/mysql/...
```
