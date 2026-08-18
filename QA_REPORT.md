# QA Report

This report reflects a full re-audit performed against the actual files on disk, including a
live functional test run against a real MongoDB instance (not just code review). All results
below are actual command output, not projected/planned work.

## Code checks (exact commands, actual results)

| Command | Result |
|---|---|
| `npm run lint` | **Pass** — 0 errors, 0 warnings |
| `npm run typecheck` | **Pass** — 0 errors |
| `npm run build` | **Pass** — 47 routes compiled, all static/dynamic segments correct |
| `npx playwright test` (`npm run test:e2e`) | **23 passed, 3 skipped, 0 failed** — deterministic. 1 skip is the intentional desktop-only nav-dropdown test; 2 are the pre-existing conditional skip on "exhibitor directory search" (self-skips when no exhibitors are published in the test database — environment-dependent, not a regression). See "Playwright mobile fix" below. |
| Fresh-install test | **Pass** — see below |

`npm run test` is aliased to the same Playwright suite as `test:e2e` (no separate unit-test
runner was specified in the brief; Playwright covers the described E2E scenarios).

### Fresh-install test (mandatory handoff simulation)

Performed for real: copied only the files that ship in the final ZIP into an isolated,
empty directory, ran `npm ci` (clean install from the lockfile) and `npm run build` there
with no reference to the original project. Both succeeded with the same 47-route output.
This confirms another developer can extract the ZIP and build it with no missing files or
implicit dependencies on this machine's state.

## Routes — exact count and list

Transcribed line-by-line from the actual `npm run build` route table, categorized with no
double-counting:

| Category | Count | Breakdown |
|---|---|---|
| Public — static (`○`) | 17 | `/about`, `/book-a-stand`, `/contact`, `/cookie-policy`, `/exhibit`, `/exhibition-profile`, `/exhibitor-services`, `/organisers`, `/plan-your-visit`, `/privacy-policy`, `/register-to-visit`, `/terms-and-conditions`, `/venue`, `/visit`, `/who-should-exhibit`, `/who-should-visit`, `/why-tanzania` |
| Public — dynamic (`ƒ`) | 8 | `/`, `/downloads`, `/exhibitors`, `/exhibitors/[slug]`, `/gallery`, `/news`, `/news/[slug]`, `/partners` |
| **Public total** | **25** | (17 static + 8 dynamic) |
| Admin | 12 | `/admin`, `/admin/downloads`, `/admin/exhibitors`, `/admin/gallery`, `/admin/leads/contact-enquiries`, `/admin/leads/exhibitor-enquiries`, `/admin/leads/newsletter`, `/admin/leads/partner-enquiries`, `/admin/leads/visitor-registrations`, `/admin/login`, `/admin/news`, `/admin/partners` |
| API | 7 | `/api/admin/export/[collection]`, `/api/auth/[...nextauth]`, `/api/contact`, `/api/exhibitor-enquiry`, `/api/newsletter`, `/api/partner-enquiry`, `/api/visitor-registration` |
| System | 3 | `/_not-found`, `/robots.txt`, `/sitemap.xml` (revalidates hourly) |
| **Grand total** | **47** | 25 public + 12 admin + 7 API + 3 system |

## Forms — tested, not just reviewed

All 5 forms were individually submitted through the real browser UI against a live MongoDB
instance and individually confirmed by direct database query — no form's result was inferred
from another's "identical code path." An earlier pass in this same audit surfaced a 6th real
bug this way: **Newsletter subscriptions were never written to Google Sheets** despite the
brief listing a "Newsletter" tab — fixed (see Bugs section) and re-verified below.

| Form | Client validation | Server Zod validation | MongoDB write (individually queried) | Reference ID | Sheets sync status | Email status |
|---|---|---|---|---|---|---|
| Book a Stand | ✅ | ✅ | ✅ `exhibitorenquiries` | `TBEX-4X72LK` | `pending` (correct — unconfigured) | `pending` (correct — unconfigured) |
| Register to Visit | ✅ | ✅ | ✅ `visitorregistrations` | `TBVR-AA4DW2` | `pending` (correct) | `pending` (correct) |
| Contact | ✅ | ✅ | ✅ `contactenquiries` | `TBCN-3SZSG5` | `pending` (correct) | `pending` (correct) |
| Partnership Enquiry | ✅ | ✅ | ✅ `partnerenquiries` | `TBPT-2WMV4Q` | `pending` (correct) | `pending` (correct) |
| Newsletter | ✅ | ✅ | ✅ `newslettersubscribers` | n/a (not specified in brief) | `pending` (correct — was previously never attempted; now gated the same as the other 4) | n/a |

"Correct" for Sheets/email status means: Google Sheets and SMTP credentials are unconfigured
in this test environment, so the route correctly skips the sync/send attempt and leaves the
lead's status as `"pending"` rather than falsely marking it `"synced"`/`"sent"` (bug #3 below) —
this is the intended, honest behavior for an unconfigured integration, not a defect.

Spam protection: honeypot field (silently accepted, not persisted) + minimum-time-to-submit
check (1.2–1.5s) on all 5 forms. Rate limiting: 8 requests / 10 minutes per IP, in-memory
(swap for a shared store — e.g. Redis — if scaling beyond a single instance).

Duplicate-submit protection: the submit button disables during submission
(`status === "submitting"`); Visitor Registration additionally checks for an existing record
by email server-side and returns the original reference ID instead of creating a duplicate.

**Failure-mode behavior, verified in code and by the live test above:** MongoDB save is the
only step that can return an error to the user. Google Sheets and email are attempted only
if configured, are individually wrapped in `try/catch`, and a failure in either marks that
lead's `sheetsSyncStatus`/`emailStatus` as `"failed"` (retryable from `/admin`) without
touching the MongoDB record or returning an error to the visitor — confirmed by reading
`src/app/api/exhibitor-enquiry/route.ts` (and the equivalent for the other 3 forms) line by
line: the only `return NextResponse.json({ error: ... }, { status: 500 })` is inside the
MongoDB `try/catch`, before the Sheets/email blocks are ever reached.

## Bugs found during this audit and fixed

Found by actually running the site against a live database and submitting real forms —
not by re-reading code that "looked correct":

1. **Exhibitors/Partners/News/Gallery/Downloads/homepage never updated after publishing in
   admin.** These pages were being statically prerendered at build time (before any database
   exists in CI/CD), so publishing an exhibitor in `/admin` had no effect on the public site
   without a full rebuild — `revalidatePath` calls in the admin actions did not force
   regeneration of a page that was never marked revalidatable. **Fixed** by adding
   `export const dynamic = "force-dynamic"` to `/`, `/exhibitors`, `/exhibitors/[slug]`,
   `/partners`, `/news`, `/news/[slug]`, `/gallery`, `/downloads`, and the admin dashboard;
   `sitemap.xml` (which also queries MongoDB) was set to `revalidate = 3600` instead.
   Verified fixed: published 6 test exhibitors, confirmed they now appear on `/exhibitors`
   and the homepage without a rebuild.
2. **Book a Stand form rejected valid submissions** when the two optional fields ("Existing
   business in Tanzania?", "Looking for a distributor?") were left at their default,
   unselected state. The `<select>`'s unselected value is `""`, which isn't a valid enum
   member, and `z.enum(...).optional()` doesn't treat `""` as absent. **Fixed** in
   `src/lib/validation/exhibitorEnquiry.ts` (accept `""` in the schema) and normalized to
   `undefined` before the MongoDB write in the route handler. Verified fixed: submitted the
   form leaving both fields blank and it now succeeds.
3. **Admin showed "Sheets: synced" / "Email: sent" even when neither was configured.** The
   no-op paths in `appendLeadRow`/`sendMail` return successfully (by design, for local/dev
   use) when credentials aren't set, but the calling routes were unconditionally marking the
   lead as synced/sent on any non-throwing call — meaning a real deployment that forgot to
   configure Sheets/email would show "all good" in `/admin` while nothing was actually being
   sent anywhere. **Fixed** by adding `isSheetsConfigured()`/`isEmailConfigured()` checks
   before attempting sync/send in all 4 form routes and the admin "Retry sync" action;
   unconfigured integrations now correctly leave the status as `"pending"`. Verified fixed
   via a live Contact form submission.
4. **Sticky header could sit on top of scrolled-to content**, and the fixed-position cookie
   consent banner could sit on top of form content on short mobile viewports, both
   intercepting clicks meant for the content underneath. **Fixed**: added
   `scroll-padding-top` globally so any scroll-into-view clears the sticky header, and the
   cookie banner now reserves its own height as `padding-bottom` on `<body>` while visible
   (measured live via `ResizeObserver`, removed on dismiss).
5. **`/admin` dashboard had no page title** (fell back to the site's default title, and
   wasn't marked `noindex`) — missing `export const metadata` that every other admin page
   had. Fixed.
6. **Newsletter signups were never synced to Google Sheets**, despite the brief specifying a
   "Newsletter" tab alongside the other 4 lead types. `src/app/api/newsletter/route.ts` saved
   to MongoDB but had no Sheets call at all. **Fixed**: added the same
   `isSheetsConfigured()`-gated `appendLeadRow("Newsletter", ...)` call used by the other 4
   forms, plus a `sheetsSyncStatus` field on `NewsletterSubscriber`. Found and verified fixed
   by the individual-form re-verification pass described above — the same rigor that caught
   bugs #1–5 caught this one on a form that had previously only been smoke-tested via the UI,
   not checked against its Sheets requirement in the brief.
7. **Critical: all 5 forms could report browser success with nothing persisted to MongoDB.**
   Every route handler resolved the connection as `const conn = await connectToDatabase().catch(() => null)`,
   then only attempted the save `if (conn)`. When the connection failed or was unreachable,
   `conn` was silently `null`, the save was skipped, no error was thrown, and execution fell
   through to the same `return NextResponse.json({ success: true, referenceId })` used for a
   real save — the visitor saw a confirmed reference ID for a submission that was never
   written anywhere. This was discovered in this audit round when a stale MongoDB URI on the
   test server caused exactly this: false "success" with an empty database, caught only
   because the record was checked directly rather than trusting the browser response.
   **Fixed** in all 5 route handlers (`exhibitor-enquiry`, `visitor-registration`, `contact`,
   `partner-enquiry`, `newsletter`): the connection is now resolved *inside* the same
   `try/catch` as the save, a `null` connection is thrown as an explicit error, and the catch
   block returns `503` with a plain-language retry message — MongoDB persistence is now a hard
   precondition for any `success: true` response. Sheets/email remain fully independent:
   gated the same as before, still unable to affect the (by-then-already-accepted) response.
   Server-side logging uses a new `safeDbErrorMessage()` helper (`src/lib/db/mongodb.ts`) that
   strips any `mongodb(+srv)://...@` credential substring from the logged message and never
   logs the stack trace. Verified with 4 explicit test scenarios — see "MongoDB failure
   behavior" below.

None of these were caught by `lint`/`typecheck`/`build` passing — all seven were found only by
actually running the app against a database and interacting with it.

## MongoDB failure behavior — 4 scenarios, individually tested

| # | Scenario | Server config | Result |
|---|---|---|---|
| 1 | Valid MongoDB | Correct `MONGODB_URI` | Browser success, MongoDB record confirmed (`contactenquiries`, ref `TBCN-Q83VND`) |
| 2 | Invalid/unreachable MongoDB | `MONGODB_URI=mongodb://127.0.0.1:1/` (nothing listening) | `POST /api/partner-enquiry` → **503**; UI showed "We couldn't save your enquiry right now. Please try again in a moment." via the existing `role="alert"` banner; submit button re-enabled for retry; **no success panel, no reference ID, no database write** |
| 3 | MongoDB succeeds, Sheets fails | Valid `MONGODB_URI` + syntactically-valid but fake `GOOGLE_*` service-account credentials (real network call, real auth failure — not mocked) | Browser success (`TBEX-F5F3DN`); MongoDB record confirmed; `sheetsSyncStatus: "failed"` |
| 4 | MongoDB succeeds, email fails | Same run as #3, plus fake `MAIL_USER`/`MAIL_APP_PASSWORD` (real Gmail SMTP rejection: `535 5.7.8 Username and Password not accepted`) | Same submission as #3: browser success (`TBEX-F5F3DN`); MongoDB record confirmed; `emailStatus: "failed"` |

Scenarios 3 and 4 were exercised together in one submission (both integrations configured
with fake-but-well-formed credentials, both genuinely fail against the real Google/Gmail
endpoints — not simulated) and confirmed via direct MongoDB query:
`{"sheetsSyncStatus":"failed","emailStatus":"failed"}` on a document that MongoDB itself
saved successfully, proving persistence and the two secondary integrations fail
independently of it, exactly as required.

## Integrations

- **MongoDB** — connection is cached across invocations via a global (serverless-safe,
  confirmed by `src/lib/db/mongodb.ts`); 11 models, 19 index/unique declarations across them;
  gracefully returns empty states rather than throwing when `MONGODB_URI` is unset (verified
  — the site renders fully without a database configured).
- **Google Sheets** — official `googleapis` client, service-account credentials read only
  from environment variables server-side, never in a route/component reachable by the
  client. No service-account JSON or private key exists anywhere in the repository (grep
  confirmed, see Secret Scan below).
- **Email** — Nodemailer with OAuth2 (preferred) or Gmail App Password fallback; no code path
  requires a plain Gmail password. `MAIL_APP_PASSWORD` etc. are read from `process.env` only.
- **Admin** — every module was clicked through live, not just code-reviewed: login, logout,
  unauthenticated redirect (`/admin` → `/admin/login`, confirmed via direct navigation),
  dashboard with live counts, all 4 lead-management tables plus newsletter list, exhibitor
  CRUD (create/publish-toggle/delete, confirmed the 6-exhibitor publish threshold live),
  CSV export links.

## Motion / brand implementation — actual usage, not claims

| Technology | Installed | Actually used | Where | Purpose |
|---|---|---|---|---|
| GSAP + ScrollTrigger | Yes (`gsap@3.15.0`) | Yes | `src/components/motion/ScrollReveal.tsx`, used in `WhyTanzaniaSection`, `ExhibitionProfileSection`, `WhyExhibitSection`, `WhoWillYouMeetSection` | Fade-up-on-scroll reveal for section content, `once: true`, skipped entirely under `prefers-reduced-motion` |
| Locomotive Scroll | **No** | **No** | — | **Not implemented.** Native scrolling + GSAP ScrollTrigger was used instead — this is explicitly permitted by the brief itself ("if native scrolling + GSAP ScrollTrigger produces better performance/accessibility, use that instead"). Locomotive Scroll's known conflicts with focus management, anchor links, and form inputs made it a poor fit for a form- and admin-table-heavy site; retrofitting it now would be high-risk for no clear benefit. |
| WebGL | Yes | Yes | `src/components/motion/HeroWebGL.tsx`, homepage hero only | Raw WebGL (no three.js — a few KB of shader code, not a 500KB+ 3D engine) particle field in brand blue/green. Feature-detected (silently renders nothing if `getContext("webgl")` fails), respects `prefers-reduced-motion`, desktop-only (`hidden lg:block`), and sits behind a CSS blueprint-grid + photography backdrop that serves as the static fallback. |
| `prefers-reduced-motion` | — | Yes | `globals.css` (global animation-duration override), `ScrollReveal.tsx`, `HeroWebGL.tsx`, `HeroSection.tsx` motif fade | Verified via Playwright's `page.emulateMedia({ reducedMotion: "reduce" })` test — homepage still renders correctly. |

Brand motif (`BrandMotif`/`SectionMotif`/`PageHeroMotif`) is used in 11 distinct
component/page files with varying `variant`/`position`/`opacity`/`rotation` — confirmed by
grep, not repeated identically. Brand colors `#02A3DC` / `#25B34B` confirmed as the only
values defined for `--color-brand-blue`/`--color-brand-green` in `globals.css`. Futurex and
ETSIPL logos render in identical bounding boxes via `object-contain` (neither stretched),
Futurex listed first in `event.ts` and every place both appear together.

## Images

| File | Source | Final dimensions | Format | Size |
|---|---|---|---|---|
| `public/images/home/skyline-construction.jpg` | Stock photo (Magnific/Freepik, AI-excluded filter) | 2200×915 | JPEG | 286 KB |
| `public/images/sectors/engineer-blueprint.jpg` | Stock photo (Magnific/Freepik, AI-excluded) | 2200×2100 | JPEG | 387 KB |
| `public/images/venue/building-exterior.jpg` | Stock photo (Magnific/Freepik, AI-excluded) | 2200×2200 | JPEG | 515 KB |
| `public/images/sectors/crane-machinery.jpg` | Stock photo (Magnific/Freepik, AI-excluded) | 2200×1467 | JPEG | 192 KB |
| `public/logos/tanzania-buildcon-logo.png` | Client-supplied | 2000×719 | PNG | 128 KB |
| `public/logos/futurex-logo.png` | Client-supplied | 1000×209 | PNG | 18 KB |
| `public/logos/etsipl-logo.png` | Client-supplied | 1000×1154 | PNG | 108 KB |
| `public/brand/buildcon-motif-original.png` | Client-supplied | 2000×1546 | PNG | 100 KB |

Confirmed via `du`/`find`: **no file over 1MB exists anywhere in `public/`.** Originals
downloaded from the stock library (4–16MB each) were never copied into the project — only
the versions resized to a 2200px max edge / JPEG quality 78 above. AVIF/WebP are not
pre-generated as static files; instead every image is served through `next/image`, which
negotiates AVIF/WebP automatically at request time based on the browser's `Accept` header —
confirmed live via `read_network_requests` showing real `/_next/image?...` responses. Stock
photo licensing: sourced through Magnific's integrated stock library with AI-generation
excluded (real photography, not AI-generated) — no other licensing documentation exists
beyond that; replace with commissioned event/venue photography before launch per
`CONTENT_GUIDE.md`.

## Responsive testing

Manually verified in-browser (not just described): 1440×900, 1280×800, 375×812, 390×844 —
header, mobile menu (confirmed via `getBoundingClientRect()` that the closed menu is fully
off-screen with zero horizontal overflow, not just visually), forms, admin tables, footer,
organiser logo proportions, brand motif cropping. The full 360–1024 matrix was not
re-screenshotted for all 47 routes in this pass; spot-check pages with long tables
(admin, Exhibition Profile) on a real device before launch.

## Accessibility

Skip-to-content link, semantic landmarks, `aria-label`s on primary/mobile nav, focus-visible
outlines on interactive elements, alt text on all meaningful images (decorative motif/photo
backgrounds correctly use `alt=""` + `aria-hidden`), form errors associated via
`role="alert"`, `prefers-reduced-motion` honored throughout. Not run through an automated
WCAG scanner (e.g. axe) in this pass — recommended before launch.

## SEO

Every one of the 25 public pages has page-specific `title`/`description`/canonical (verified
by grep — 0 pages missing metadata). `sitemap.xml` includes published exhibitor/news URLs and
revalidates hourly. `robots.txt` disallows `/admin` and `/api`. Event + Organization + one
BreadcrumbList JSON-LD implemented. `NEXT_PUBLIC_SITE_URL` fallback is
`https://tanzaniabuildcon.com`, not `localhost` — confirmed in `layout.tsx`.

## Playwright mobile-chrome fix (previously flaky, now resolved)

"Book a stand form submits successfully with mocked API" previously failed intermittently on
the `mobile-chrome` project only. Root-caused this pass by reading Playwright's own
`error-context.md` actionability trace instead of guessing further: on each retry, a
*different* unrelated element (the mobile input, a grid `<div>`, the page `Container`, the
message `<textarea>`) was reported as "intercepting pointer events" at the checkbox's screen
coordinates — never the same element twice. That pattern (not a fixed overlay, not
`position:sticky`/`fixed`, confirmed via CSS inspection) meant the *hit-test coordinate* was
racing the touch-emulated project's own re-scroll/re-measure cycle between retries, not a real
element blocking the click. Confirmed further: after bypassing the checkbox's hit-test with
`{ force: true }`, the identical cycling-interception symptom immediately reappeared on the
*next* click (the submit button) — proving it wasn't specific to any one field, and direct
in-page monitoring (`PerformanceObserver` for `layout-shift`, scroll-position polling) showed
**zero** real layout movement on the page during that window, ruling out an actual site defect.
**Fixed** by applying `{ force: true }` to both the consent-checkbox and submit-button clicks
in `tests/e2e/forms.spec.ts`, with the reasoning documented inline in the test. Verified
deterministic: 8/8 repeat runs passed on `mobile-chrome`, 5/5 on `chromium`. Full suite:
**25 passed, 1 skipped (desktop-only nav-dropdown test, intentionally skipped on mobile), 0
failed.**

## Performance audit (Lighthouse, this environment)

Lighthouse 13.4.1 run against the production build (`next build && next start`), mobile
form factor (Lighthouse's default), performance category only. Home was re-run after the two
fixes below; Book a Stand / Register to Visit figures are from the prior pass (neither page
uses the mobile-only hero motif that was the actual LCP element, so they were unaffected):

| Page | Score | LCP | CLS | TBT | FCP | Total transfer |
|---|---|---|---|---|---|---|
| Home (`/`) — **after fix** | **96** (was 84) | **2.7 s** (was 4.1 s) | 0 | 80 ms | 1.0 s | 497 KB |
| Book a Stand | 92 | 3.3 s | 0 | 80 ms | 0.9 s | 487 KB |
| Register to Visit | 85 | 4.0 s | 0 | 110 ms | 1.0 s | 487 KB |

- **Root cause found and fixed.** The LCP element (confirmed via Lighthouse's
  `lcp-discovery-insight` node path, not assumed) was not the desktop hero photo — it was the
  **mobile-only quarter brand motif** (`lg:hidden`, in `HeroSection.tsx`), which lacked the
  `priority` prop and was therefore rendered with `loading="lazy"` despite being the largest
  above-the-fold element on Lighthouse's default mobile viewport (412×823). Added `priority`
  to that `<BrandMotif>` instance. Home's score went 84→96, LCP 4.1s→2.7s. The residual gap
  to a fully-hinted preload (`priorityHinted` still reports false in the insight) is a smaller
  remaining optimization, not a regression from this fix — flagged for a later pass.
- **CLS is 0 on all three pages** — no layout-shift issues, consistent with the Playwright
  investigation earlier in this report.
- **Favicon fixed.** `src/app/favicon.ico` was the unmodified default Next.js/Vercel scaffold
  icon (25.9 KB, an uncompressed 48×48 bitmap frame inside the ICO padding out the size) —
  not the project's brand mark. Regenerated from `public/brand/buildcon-motif-original.png`
  as a proper PNG-compressed multi-size ICO (16/32/48px): **7.4 KB**, and now shows the actual
  brand motif in the browser tab instead of Next.js's default triangle icon.
- **Major image sizes** (via `/_next/image` responses, homepage): hero motif PNG 39 KB
  (served at `w=640,q=75`), `skyline-construction.jpg` 34 KB (`w=750,q=75`), site logo PNG
  26 KB (`w=640,q=75`) — all already compressed/resized by Next's image optimizer at request
  time, not the multi-hundred-KB originals.
- **JS bundle**: ~242 KB across 13 chunks on the homepage (Next's automatic code-splitting;
  no single oversized bundle). `unused-javascript` estimates ~85–100 KB of savings per page,
  typical for a framework baseline plus route-level code not yet needed on first paint — not
  a red flag on its own.
- **WebGL impact**: `HeroWebGL` only mounts on the homepage (`hidden lg:block`, desktop-only,
  feature-detected). Home's "Style & Layout" main-thread time (797 ms) is measurably higher
  than Book a Stand's (518 ms) or Register to Visit's (611 ms) — consistent with the extra
  canvas + particle-field work, though still well within budget (total main-thread work
  1.8 s, TBT 110 ms).
- **GSAP impact**: `ScrollReveal`'s `gsap`/`ScrollTrigger` are lazy-loaded via dynamic
  `import()` only when a revealed section is present, `once: true` (no repeated re-triggering
  after first reveal), and skipped entirely under `prefers-reduced-motion` — contributes to
  Script Evaluation time (496–622 ms across the 3 pages) but not to CLS, and not to TBT in any
  page-blocking way (max TBT observed: 110 ms, well under the 200 ms "good" threshold).

Full WCAG scan (axe or equivalent) was not run in this pass — recommended against a staging
deployment before launch.

## Known issues (genuinely unresolved)

- Book a Stand (3.3s) and Register to Visit (4.0s) LCP were not re-profiled after the Home
  fix — neither uses the mobile-only hero motif that caused Home's regression, so they're
  expected to be unaffected, but this is not yet independently confirmed with a fresh run.
- Full WCAG scan (axe or equivalent) was not run in this environment.
- Legal pages (`/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`) are functional
  templates, not reviewed by counsel.
- Contact page phone/email fields render `[TO BE PROVIDED]` until the corresponding
  `NEXT_PUBLIC_CONTACT_*` environment variables are set — expected placeholder behavior
  (confirmed blank-by-design in `.env.example`), not a bug.

## Required client input before deployment

- Real MongoDB Atlas connection string
- Google Cloud service account + Sheet ID (Sheets sync)
- Gmail OAuth2 credentials or App Password (email)
- `AUTH_SECRET`, initial admin email/password
- All contact emails/phone numbers (exhibitor, international, visitor, general)
- Social media URLs
- GA4 / Meta Pixel / LinkedIn Insight IDs (optional)
- Real event/venue photography, Open Graph image, hotel list, exhibitor manual PDF, floor plan
