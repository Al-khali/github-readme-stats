# Self-hosting on Railway

This fork is deployed on Railway via the `Dockerfile` (`node express.js`,
listening on `$PORT`). `railway.json` adds a `/health` healthcheck and an
on-failure restart policy so the service recovers from crashes and transient
GitHub API failures.

## Required environment variables

| Variable | Required | Notes |
|---|---|---|
| `PAT_1` | **Yes** | A GitHub Personal Access Token (classic, no scopes needed for public data; add `repo` if `count_private=true`). **The #1 cause of "broken cards" is a missing or expired `PAT_1`** — when the token is exhausted/invalid the API returns an error card. |
| `PAT_2` … `PAT_n` | No | Additional tokens; the server rotates across them to raise the effective rate limit. |
| `CACHE_SECONDS` | No | Response cache TTL. A higher value (e.g. `21600`) reduces API calls and rate-limit pressure for a single-user instance. |
| `PORT` | No | Injected by Railway automatically. |

## Health

```
GET /health  ->  200  { "status": "ok", "uptime": <seconds> }
```

The probe never calls the GitHub API, so it stays green even if a PAT is
exhausted — that distinguishes "process down" from "GitHub API degraded".

## If cards still look broken

1. Check `PAT_1` is set and not expired in the Railway service variables.
2. Hit `https://<your-railway-domain>/api?username=al-khali` directly and read
   the SVG — an error card spells out the reason ("Maximum retries exceeded",
   "Bad credentials", etc.).
3. The consuming workflow (profile repo `stats.yml`) already validates the SVG
   before committing, so a degraded instance will no longer clobber good cards.
