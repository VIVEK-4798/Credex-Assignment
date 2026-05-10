# Architecture & Design

## System Overview

AI Spend Audit is a **no-auth, privacy-first SaaS tool** that performs AI tool spend analysis in real-time. The system is designed for low friction (no signup) and minimal data collection.

### Request Flow Diagram

```
User Input
    │
    ▼
┌────────────────────────────────────────────────┐
│         Form Submission (Client)               │
│  - Tool selection + spend + team size          │
│  - Honeypot field validation                   │
└────────────────┬───────────────────────────────┘
                 │
                 ▼ HTTPS POST /api/audits
         ┌──────────────────────┐
         │  Zod Validation      │ ← Input validation (TypeScript)
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  Rate Limit Check    │ ← IP-based (10/5min)
         └──────────┬───────────┘
                    │
                    ▼
    ┌──────────────────────────────────────────────┐
    │      Deterministic Audit Engine              │ ← Core logic
    │  - Per-tool evaluation                       │   (TypeScript)
    │  - Cross-tool consolidation analysis         │   (< 100ms)
    │  - Confidence scoring                        │   (No I/O)
    │  - Savings calculation                       │
    └────────────┬─────────────────────────────────┘
                 │
         ┌───────┴──────────┐
         │                  │
         ▼                  ▼
    ┌─────────────┐  ┌──────────────┐
    │  Audit Row  │  │ AI Summary   │
    │  Persisted  │  │  Generated   │
    │  to DB      │  │  (gpt-4o-mi) │
    │             │  │  ~500ms      │
    │ ID:         │  │  (cached)    │
    │ public_id   │  │              │
    │ results_json│  │ Fallback:    │
    │             │  │ Deterministic│
    └──────┬──────┘  │ summary      │
           │         └──────────────┘
           │
           ▼
    ┌──────────────────────────┐
    │  Supabase PostgreSQL     │
    │  (audits, leads tables)  │
    └──────────────────────────┘
           ▲
           │
    ┌──────┴──────────────┐
    │                     │
    ▼                     ▼
┌─────────────┐    ┌──────────────┐
│ Public      │    │ Lead Capture │
│ Results     │    │ Email + Co.  │
│ Page        │    │ Separate DB  │
│ /results/id │    │ Secured      │
└─────────────┘    └──────────────┘
```

**Key Properties**:
- **Synchronous**: Entire flow < 1s (100ms audit engine + 500ms AI)
- **Deterministic**: Same input → Same output (no randomness in core logic)
- **Privacy-preserving**: Public URLs don't leak sensitive data
- **Resilient**: Fallback to deterministic summary if OpenAI fails

---

## Stack Decisions

### Frontend: Next.js 16 (App Router) + React 19 + TypeScript

**Why Not**: 
- ❌ Create-React-App (no backend integration)
- ❌ Gatsby (static builds too slow for dynamic audits)
- ❌ Remix (heavier learning curve, not needed)

**Why Next.js**:
- ✅ API routes in same repo (no separate backend)
- ✅ Server components reduce JS bundle size
- ✅ Image optimization (next/image)
- ✅ Built-in font optimization
- ✅ Vercel deployment is zero-config
- ✅ App Router enables dynamic routes (/results/[id])

**Trade-off**: Can't run on CDN-only (needs Node.js). ✅ Acceptable for audit tool (users don't require edge speed).

### Styling: TailwindCSS v4

**Why Not**:
- ❌ CSS-in-JS (runtime overhead, bundle size)
- ❌ Styled Components (same issue)
- ❌ Hand-written CSS (maintainability)

**Why Tailwind**:
- ✅ Zero runtime overhead (all static)
- ✅ PurgeCSS removes unused styles automatically
- ✅ Developer velocity (rapid UI iteration)
- ✅ Consistent design system
- ✅ Mobile-first responsive by default

**Trade-off**: Longer class names. ✅ Mitigated by prettier-plugin-tailwindcss (auto-formatting).

### Forms: React Hook Form + Zod

**Why Not**:
- ❌ Formik (too verbose, more boilerplate)
- ❌ React Final Form (learning curve)
- ❌ Manual form state (too error-prone)

**Why RHF + Zod**:
- ✅ Minimal re-renders (reactive form library)
- ✅ Runtime validation (Zod) + TypeScript types from same schema
- ✅ Small bundle (~15KB gzipped)
- ✅ Excellent error messages
- ✅ Zero dependencies after install

**Trade-off**: Two libraries vs one. ✅ But they're lightweight + orthogonal.

### State Management: Zustand

**Why Not**:
- ❌ Redux (boilerplate-heavy)
- ❌ Context (causes re-renders)
- ❌ MobX (too magical)

**Why Zustand**:
- ✅ Minimal boilerplate (store is just a function)
- ✅ Direct mutations (no action creators)
- ✅ No provider nesting (not Context-based)
- ✅ Small bundle (~2KB gzipped)
- ✅ TypeScript-first API

**Trade-off**: Less mature than Redux. ✅ But fine for MVP (stores are simple audit state).

### Database: Supabase (PostgreSQL)

**Why Not**:
- ❌ Firebase (forces NoSQL schema, vendor lock-in)
- ❌ MongoDB (no transactions, schema-less footgun)
- ❌ Self-hosted Postgres (ops overhead)

**Why Supabase**:
- ✅ PostgreSQL (mature, reliable, ACID)
- ✅ Real-time subscriptions (if needed later)
- ✅ Built-in auth (for future features)
- ✅ Row-level security (privacy by default)
- ✅ Per-request pricing (aligns with MVP usage)
- ✅ Can self-host later if needed

**Trade-off**: Vendor lock-in. ✅ Mitigated by standard SQL (easy to migrate).

### AI Integration: OpenAI API (gpt-4o-mini)

**Why Not**:
- ❌ Anthropic Claude (similarly priced, no speed advantage)
- ❌ Open-source LLM (latency + infrastructure)
- ❌ No LLM (deterministic summaries only) — considered but less polish

**Why gpt-4o-mini**:
- ✅ 10x cheaper than GPT-4 (cost-conscious)
- ✅ Fast (< 500ms for summarization)
- ✅ Quality sufficient for text summarization
- ✅ Proven reliability at scale
- ✅ Easy to switch later if needed

**Trade-off**: Reliance on external API. ✅ Mitigated by fallback to deterministic summary (product works if API fails).

### Testing: Vitest + React Testing Library

**Why Not**:
- ❌ Jest (slower, more overhead)
- ❌ Mocha + Chai (less integrated)

**Why Vitest**:
- ✅ Jest-compatible API (easy migration)
- ✅ 10x faster (uses esbuild)
- ✅ Native ESM support
- ✅ Great for testing audit engine logic

**Trade-off**: Newer than Jest. ✅ But stable enough for production.

---

## Audit Engine: Why Deterministic Over AI

### The Question
"Why not use ChatGPT to generate recommendations directly?"

### The Answer

**Core Logic Must Be Deterministic**

```
User A inputs: ChatGPT Team ($100/2 seats)
Expected output: Recommendation to downgrade to Plus ($20/seat)
Savings: $80/month

Why this MUST be deterministic:
- Financial claim (savings amount)
- Decision involves money (user trusts this)
- Needs auditability (why did we recommend this?)
- No variance allowed (same user → same recommendation always)
```

**If we used AI**:
- ❌ Recommendation could change day-to-day
- ❌ Hallucinations (Claude might suggest canceling critical tool)
- ❌ No auditability ("Why did ChatGPT recommend this?")
- ❌ Users lose trust (different result = tool is broken)

**Our Approach**:
- ✅ Rules-based engine (if conditions → recommendation type)
- ✅ Confidence scores (0–100) reflect uncertainty
- ✅ Explainable (code states exact logic)
- ✅ Testable (deterministic = easy to test edge cases)
- ✅ Fast (no API latency)

### AI's Role: Summarization Only

```
Deterministic audit engine generates:
{
  type: "downgrade",
  toolId: "chatgpt",
  savings: 80,
  confidence: 0.95,
  reason: "Team is small (2 people), ChatGPT Plus covers all needs"
}

Then AI (gpt-4o-mini) turns this into:
"Based on your team size and usage pattern, we found you could 
save $80/month by moving from ChatGPT Team to Plus. Your team 
is small enough that individual subscriptions provide the same 
capabilities at lower cost."

Why this is safe:
- AI isn't inventing recommendations
- AI is just translating structured data to prose
- If AI hallucinates, we fall back to deterministic summary
- User sees exact numbers regardless
```

---

## Scale Thinking: 10,000 Audits/Day

### Current Architecture (1,000 audits/day)

**Working assumption**: Synchronous, no caching, all CPU-bound

```
Request → Validate → Audit Engine (100ms) → Persist → Response
```

**Capacity**: 
- 10 Node.js processes × 1000 req/process = 10,000 concurrent
- Vercel auto-scales to this

### At 10,000 audits/day (10-50x growth)

**Bottlenecks emerge**:

1. **Audit Engine CPU** (was 100ms, now 200-500ms under load)
2. **OpenAI API** (rate limits + latency)
3. **Database connections** (connection pool exhaustion)
4. **Memory** (storing intermediate objects)

### Solutions (Phased)

**Phase 1 (1K-10K audits/day)**: Current architecture, no changes

**Phase 2 (10K-100K audits/day)**:
- ✅ Implement summary queue (Redis) — async OpenAI calls
- ✅ Cache common audit results (Vercel KV)
- ✅ Connection pooling (Supabase already has this)
- ✅ Worker processes for long-running audits

```
Before:
Request → Validate → Audit Engine → OpenAI (500ms) → Persist → Response (700ms)

After:
Request → Validate → Audit Engine (100ms) → Queue Summary → Return Results
                                                   ↓
                                          Worker Process (async)
                                          → OpenAI → Update DB
```

**Phase 3 (100K+ audits/day)**:
- ✅ Stream audit results (return before summary is ready)
- ✅ Dedicated audit compute (separate service)
- ✅ Analytics pipeline (separate write database)
- ✅ Edge caching (Cloudflare) for public results

```
Microservices:
- API Gateway (rate limiting, routing)
- Audit Service (deterministic engine)
- Summary Service (OpenAI + caching)
- Lead Service (email + persistence)
- Analytics Service (BigQuery pipeline)
```

### Data Migration Path

**Currently**:
```sql
CREATE TABLE audits (
  id UUID,
  results_json JSONB,  -- Full results
  ai_summary TEXT
);
```

**As we grow**:
```sql
-- Partition by created_date
CREATE TABLE audits_202501 PARTITION OF audits FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Archive old summaries to S3
ALTER TABLE audits DROP COLUMN ai_summary;  -- Move to S3
CREATE TABLE summaries_archive (
  id UUID,
  s3_path TEXT,
  created_at TIMESTAMP
);
```

### No Breaking Changes Required

**Current design future-proofs for scale**:
- ✅ Audit results immutable after creation (can cache aggressively)
- ✅ Recommendations deterministic (cache key = input hash)
- ✅ No user sessions (no session state to migrate)
- ✅ API is stateless (horizontal scaling trivial)

---

## Deployment

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
OPENAI_API_KEY=sk-xxx
RESEND_API_KEY=re_xxx
```

### Hosting

- **Vercel** (recommended): Optimal Next.js support, auto-scaling
- **Docker**: Use `Dockerfile` for self-hosting
- **Database**: Supabase PostgreSQL (auto-scaling + backups)

### Scaling Path

| Stage | Infrastructure |
|-------|-----------------|
| MVP (now) | Vercel + Supabase | 
| 1K users | Same (auto-scales) |
| 10K users | Add Redis for persistent rate limiting |
| 100K users | Consider edge caching (Cloudflare) + analytics pipeline |

---

## Known Limitations & Future Work

1. **Audit history**: Currently single audit per session; no account/persistence
   - Solution: Add optional email signup + account management
   
2. **Team collaboration**: Can't easily share audit with team
   - Solution: Invite links, comment threads
   
3. **Tool recommendations**: Limited to 20+ known tools
   - Solution: User-submitted custom tools
   
4. **Forecasting**: No trend analysis or budget projection
   - Solution: Track audits over time, show spending trends

---

## Code Quality

- **TypeScript**: 100% type-safe, no `any`
- **Testing**: Unit tests for audit engine + edge cases
- **Linting**: ESLint 9 + Prettier
- **CI/CD**: GitHub Actions on every push (lint + test + build)

See [README.md](README.md) for testing commands.

### 1. No Authentication Required

**Why**: Reduce friction. Users should audit in <2 minutes without friction.

**Trade-off**: Accept that data is temporary. Audit results live in a public table with a random `public_id`.

**Mitigation**: 
- Public URLs don't expose email or company name
- Lead capture (emails) stored separately in `leads` table
- Rate limiting per IP prevents abuse

### 2. Synchronous Audit Engine

**Why**: Users expect instant results. Most audits complete in <100ms.

**Trade-off**: Complex calculations run on every request (no caching).

**Implementation**: TypeScript functions in `lib/audit-engine/` run deterministically:
- Input: Tool portfolio + team size + use case
- Output: Recommendations with savings + confidence scores + implementation difficulty

### 3. Privacy-First Public Sharing

**Why**: Empower users to share results internally without exposing PII.

**Design**: 
- Audits stored with `public_id` (UUID v4) instead of user email
- `results_json` is a sanitized version of audit data (tools, spend, recommendations only)
- Public page accessible via `/results/[public_id]`
- Email + company name stored separately in `leads` table

### 4. Lightweight AI Integration

**Why**: Add polish without engineering complexity.

**Implementation**:
- OpenAI API call (gpt-4o-mini) for human-readable audit summary
- Fallback to deterministic summary if API fails
- Summary cached in Supabase to avoid re-generation

---

## Data Model

### `audits` Table

```sql
CREATE TABLE audits (
  id UUID PRIMARY KEY,
  public_id UUID UNIQUE NOT NULL,
  team_size INTEGER NOT NULL,
  primary_use_case TEXT NOT NULL,
  tools JSONB NOT NULL,                 -- [{toolId, planId, monthlySpend, seats}]
  current_monthly_spend DECIMAL NOT NULL,
  total_monthly_savings DECIMAL NOT NULL,
  recommendations JSONB NOT NULL,       -- [{id, type, toolId, reason, ...}]
  optimized_outcome TEXT,
  ai_summary TEXT,
  ai_summary_cached_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
};

CREATE INDEX idx_audits_public_id ON audits(public_id);
```

### `leads` Table

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  audit_id UUID REFERENCES audits(id),
  email TEXT NOT NULL,
  company_name TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_leads_audit_id ON leads(audit_id);
```

---

## API Routes

### `POST /api/audits`

**Purpose**: Create and run an audit, return recommendations.

**Request**:
```json
{
  "teamSize": 5,
  "primaryUseCase": "general chat/writing",
  "tools": [
    {"toolId": "chatgpt", "planId": "team", "monthlySpend": 100, "seats": 2}
  ]
}
```

**Response**:
```json
{
  "id": "uuid",
  "public_id": "uuid",
  "currentMonthlySpend": 100,
  "totalMonthlySavings": 50,
  "recommendations": [
    {
      "id": "downgrade-chatgpt",
      "type": "downgrade",
      "toolId": "chatgpt",
      "recommendedPlan": "Plus",
      "monthlySavings": 50,
      "reason": "...",
      "confidence": 0.95,
      "effortLevel": "low"
    }
  ],
  "optimizedOutcome": "...",
  "aiSummaryUrl": "/api/audits/{id}/summary"
}
```

**Rate Limiting**: 10 audits per IP per 5 minutes

---

### `GET /api/audits/[id]/summary`

**Purpose**: Get (or generate) AI summary for an audit.

**Implementation**:
1. Check if `ai_summary` is cached and fresh (< 24 hours)
2. If cached, return immediately
3. If not cached, call OpenAI API with audit context
4. Cache result in Supabase
5. Fallback to deterministic summary if API fails

**Rate Limiting**: 30 calls per IP per 5 minutes

---

### `POST /api/leads`

**Purpose**: Capture email + company name for follow-up.

**Request**:
```json
{
  "auditId": "uuid",
  "email": "user@company.com",
  "companyName": "Acme Corp"
}
```

**Response**:
```json
{
  "success": true,
  "leadId": "uuid"
}
```

**Rate Limiting**: 5 lead captures per IP per hour

---

## Abuse Protection

The app uses **lightweight, pragmatic protection** appropriate for an MVP:

### Honeypot Fields

- `company_website` in audit form (hidden from real users via CSS)
- `referral_source` in lead capture modal
- Any submission with these fields filled is silently accepted but ignored
- Does not block the request; bot sees success response

### In-Memory Rate Limiting

- Implemented in `lib/security/rate-limit.ts`
- IP-based key (derived from `x-forwarded-for` or `req.socket.remoteAddress`)
- Limits per endpoint: 
  - Audit creation: 10/5min
  - Lead capture: 5/hour
  - AI summary: 30/5min
- Stored in-memory; resets on deployment

### When to Upgrade

For production:

- **Persistent rate limiting**: Use Upstash Redis or Vercel KV
- **CAPTCHA**: Add reCAPTCHA v3 to audit form
- **CORS restrictions**: Lock to known domains
- **Request signing**: Require auth token for high-value operations

---

## Audit Engine (Core Logic)

Located in `src/lib/audit-engine/`:

### Entry Point: `engine.ts`

```typescript
export function runAuditEngine(input: AuditInput): AuditResult {
  // 1. Normalize input (invalid values → sensible defaults)
  // 2. Evaluate each tool using evaluate-tool.ts
  // 3. Generate recommendations using generate-recommendations.ts
  // 4. Prioritize by impact and confidence
  // 5. Return structured result with savings + reasons
}
```

### Key Functions

| File | Purpose |
|------|---------|
| `evaluate-tool.ts` | Analyze single tool against team size + use case |
| `generate-recommendations.ts` | Create downgrade/consolidation/optimize recommendations |
| `calculate-savings.ts` | Compute monthly/annual/percentage savings |
| `confidence-score.ts` | Assign confidence (0–100) to each recommendation |
| `prioritize-recommendations.ts` | Sort by impact + effort |

### Recommendation Types

1. **Downgrade**: Move to cheaper plan (e.g., ChatGPT Team → Plus)
   - Highest confidence when: Team is small + overprovisioned
   - Lowest confidence when: High usage + risk of losing features

2. **Consolidation**: Merge overlapping tools (e.g., ChatGPT + Claude)
   - Medium confidence; requires workflow change

3. **Optimization**: Adjust seats or usage pattern
   - Lower impact but low risk

4. **Eliminate**: Cancel unused tool
   - Only recommended for genuinely unused tools

---

## AI Integration

### OpenAI Summary Generation

**File**: `src/lib/ai/generate-summary.ts`

- Model: `gpt-4o-mini` (fast + cheap)
- Context: Full audit result including recommendations
- Prompt: `src/lib/ai/summary-prompt.ts`
- Caching: Results stored in `audits.ai_summary` with timestamp

**Why not GPT-4?** 
- gpt-4o-mini is <1/10th the cost and sufficient for summarization
- API latency: ~500ms vs 2s for GPT-4

**Fallback**: If OpenAI fails or times out, use deterministic summary in `fallback-summary.ts`

---

## Performance Optimizations

### Frontend

- **Next.js Image**: Optimized hero images via `next/image`
- **Font optimization**: Preload Geist font family
- **Lazy loading**: Form components load on demand
- **Server components**: Pages use Server Components where possible
- **CSS-in-JS**: TailwindCSS (no runtime overhead)

### Backend

- **Audit engine**: ~50ms for typical input (TypeScript, no I/O)
- **Database**: Indexes on `public_id`, `audit_id` for fast lookups
- **API caching**: AI summaries cached to avoid re-calling OpenAI
- **Connection pooling**: Supabase handles connection pooling

### Target Lighthouse Scores

- Performance: ≥ 85
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

---

## Security Considerations

### Data Protection

- **HTTPS only**: All traffic encrypted in transit
- **Public audit URLs**: Use opaque `public_id` (UUID v4); no sequential IDs
- **No user tracking**: No cookies, analytics, or user profiles
- **Email separation**: Leads table separate from audit results

### API Security

- **Rate limiting**: Per-IP limits prevent abuse
- **Input validation**: Zod schemas on all API inputs
- **CORS**: Configured for frontend domain
- **Honeypot**: Bot detection without blocking

### When to Add

- **Auth**: Only needed if users want private audit history
- **Encryption at rest**: If storing sensitive company data
- **Audit logs**: For compliance/fraud detection at scale

---

## Deployment

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
OPENAI_API_KEY=sk-xxx
RESEND_API_KEY=re_xxx
```

### Hosting

- **Vercel** (recommended): Optimal Next.js support, auto-scaling
- **Docker**: Use `Dockerfile` for self-hosting
- **Database**: Supabase PostgreSQL (auto-scaling + backups)

### Scaling Path

| Stage | Infrastructure |
|-------|-----------------|
| MVP (now) | Vercel + Supabase | 
| 1K users | Same (auto-scales) |
| 10K users | Add Redis for persistent rate limiting |
| 100K users | Consider edge caching (Cloudflare) |

---

## Known Limitations & Future Work

1. **Audit history**: Currently single audit per session; no account/persistence
   - Solution: Add optional email signup + account management
   
2. **Team collaboration**: Can't easily share audit with team
   - Solution: Invite links, comment threads
   
3. **Tool recommendations**: Limited to 20+ known tools
   - Solution: User-submitted custom tools
   
4. **Forecasting**: No trend analysis or budget projection
   - Solution: Track audits over time, show spending trends

---

## Code Quality

- **TypeScript**: 100% type-safe, no `any`
- **Testing**: Unit tests for audit engine + edge cases
- **Linting**: ESLint 9 + Prettier
- **CI/CD**: GitHub Actions on every push (lint + test + build)

See [README.md](README.md) for testing commands.
