# Chukwunedum Davidson: Senior QA Engineer, AI-enabled QA

Lagos, Nigeria · [nedum.xyz](https://nedum.xyz/) · davidsonchinedum@gmail.com

I own quality and release readiness for production software: browser, API, integration,
and data-boundary testing across complex SaaS, backed by automation that gates real
releases rather than decorating a report. Seven years in software engineering, the last
several focused on senior quality engineering, release ownership, and product security
research.

Lately most of that work is **testing AI output**: LLM features fail confidently,
plausibly and inconsistently, so I test them against golden sets, measure precision and
recall, require every answer to cite its source, and block prompt or model changes that
make any result worse.

Responsible-disclosure work has earned public credit for **2 CVEs** and
**3 GitHub Security Advisories**.

## Featured: grounded extraction QA

**[qa.nedum.xyz](https://qa.nedum.xyz)** · [source](https://github.com/nedu-m/grounded-extraction-qa)

QA harness for AI that extracts figures from financial statements, the kind of
tooling used in acquisition due diligence and financial analysis.

- **LLM evaluation:** golden-set testing with precision, recall and grounded recall
  across six labelled balance sheets and income statements.
- **Hallucination detection:** every extracted value must quote its source line, and
  a citation that does not contain its value is caught as fabricated.
- **Financial data validation:** statements in thousands or millions, ambiguous dates,
  and balance sheets that do not foot.
- **Regression gating:** a release gate that fails any prompt or model change that
  makes a single field worse, run in CI on every commit.
- **SQL data-quality checks** over a diligence data room: duplicate uploads, missing
  checklist items, cross-source reconciliation, and brand-asset mismatches.
- **API testing:** FastAPI service with a Postman collection; 343 pytest tests.

## What I work on

- **AI-enabled QA:** LLM output evaluation, golden datasets, precision and recall,
  hallucination and fabricated-fact detection, regression testing of prompt changes.
- **Release ownership:** measurable acceptance criteria, explicit release gates,
  rollback conditions, and post-deployment verification.
- **Test automation:** Playwright, Cypress, pytest, and Python/TypeScript harnesses
  running deterministic integration, API, and failure-path checks in CI.
- **Data and integration testing:** SQL reconciliation, data-quality checks, and
  approval-workflow and permission boundaries across integrated systems.
- **Product security research:** authorization, OAuth, multi-tenant boundaries,
  integrations, billing state, and cross-layer business rules.
- **[Shipped With Bugs](https://shippedwithbugs.com):** independent QA and
  responsible-disclosure research on B2B SaaS.

**Toolkit:** Playwright · Cypress · Selenium · pytest · Postman · REST APIs ·
SQL / PostgreSQL · Python · JavaScript / TypeScript · Java · FastAPI · LLM APIs
(OpenAI-compatible, DeepSeek, Claude) · Docker · GitHub Actions · Jira

## Where to find me

| | |
| --- | --- |
| Portfolio | [nedum.xyz](https://nedum.xyz/) |
| Research | [shippedwithbugs.com](https://shippedwithbugs.com) |
| LinkedIn | [chukwunedum-davidson](https://linkedin.com/in/chukwunedum-davidson-24a1aa21b) |
| Email | davidsonchinedum@gmail.com |

---

<details>
<summary><b>About this repository</b>: source for nedum.xyz</summary>

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
