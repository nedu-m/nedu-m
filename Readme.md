# Chukwunedum Davidson — Senior QA Engineer

Lagos, Nigeria · [nedum.xyz](https://nedum.xyz/) · davidsonchinedum@gmail.com

I own quality and release readiness for production software: browser, API, integration,
and data-boundary testing across complex SaaS, backed by automation that gates real
releases rather than decorating a report. Seven years in software engineering, the last
several focused on senior quality engineering, release ownership, and product security
research.

Responsible-disclosure work has earned public credit for **2 CVEs** and
**3 GitHub Security Advisories**.

## What I work on

- **Release ownership** — measurable acceptance criteria, explicit release gates,
  rollback conditions, and post-deployment verification.
- **Test automation** — Playwright, Cypress, pytest, and Python/TypeScript harnesses
  running deterministic integration, API, and failure-path checks in CI.
- **Product security research** — authorization, OAuth, multi-tenant boundaries,
  integrations, billing state, and cross-layer business rules.
- **[Shipped With Bugs](https://shippedwithbugs.com)** — independent QA and
  responsible-disclosure research on B2B SaaS.

**Toolkit:** Playwright · Cypress · pytest · Postman · REST APIs · SQL / PostgreSQL ·
Python · JavaScript / TypeScript · Java · Selenium · Docker · GitHub Actions · Jira

## Where to find me

| | |
| --- | --- |
| Portfolio | [nedum.xyz](https://nedum.xyz/) |
| Research | [shippedwithbugs.com](https://shippedwithbugs.com) |
| LinkedIn | [chukwunedum-davidson](https://linkedin.com/in/chukwunedum-davidson-24a1aa21b) |
| Email | davidsonchinedum@gmail.com |

---

<details>
<summary><b>About this repository</b> — source for nedum.xyz</summary>

<br>

A static [Parcel](https://parceljs.org/) build deployed on Vercel. Requires Node 22 or
later (see `.nvmrc`).

```bash
npm install     # install dependencies
npm start       # dev server with hot reload, opens in browser
npm run build   # clean + production build into dist/
```

**Layout**

| Path | Purpose |
| --- | --- |
| `src/index.html` | Page content and structure |
| `src/css/` | Sass sources |
| `src/js/` | Page behaviour |
| `src/img/` | Images and assets |
| `dist/` | Build output (generated, not committed) |

**Deployment.** Vercel builds `master` and serves `dist/`. The custom domain is pinned
by `CNAME`, and `vercel.json` permanently redirects the `nedu-m.vercel.app` fallback
hostname to `nedum.xyz` so there is a single canonical origin.

**Licence.** The `LICENSE` file carries the MIT licence of the
[Codrops](https://tympanus.net/codrops) template this site was originally built from.
Site content and copy are my own.

</details>
