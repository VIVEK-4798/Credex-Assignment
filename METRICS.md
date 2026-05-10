# Key Metrics & Dashboards

## Primary Success Metrics

### North Star Metric

**Audits Run Per Month**
- Target: 1,000+ audits/month by end of Year 1
- Reason: Measures product-market fit, growth trajectory, market validation
- Current: Tracking (pre-launch)

### Supporting North Stars

**Premium Conversion Rate**
- Target: 3–5%
- Reason: Validates freemium model + revenue sustainability
- Measurement: (Premium subscribers) / (Free audits) per cohort

**Monthly Recurring Revenue (MRR)**
- Target: $1K by month 6, $5K by month 12
- Reason: Business health + unit economics validation
- Calculation: (Premium ARPU × Premium Users) + (Enterprise ACV / 12)

---

## Product Metrics

### Engagement

| Metric | Target | Notes |
|--------|--------|-------|
| Audits per month | 1,000+ | Primary KPI |
| Audits per week (steady state) | 250+ | ~35/day |
| Average session time | 3–5 min | Form + results |
| Public shares per audit | 40%+ | % of audits that generate share URLs |
| Repeat users (30d) | 5%+ | Users who audit more than once |

### Quality

| Metric | Target | Notes |
|--------|--------|-------|
| NPS Score | >50 | Post-audit survey |
| Recommendation adoption | 30%+ | Users act on recommendations within 30d |
| Support issues | 0 critical | Product should be self-explanatory |
| Accuracy feedback | 90%+ helpful | Users rate recommendations as "helpful" |
| Form completion rate | 85%+ | Users complete full form |

### Monetization

| Metric | Target | Notes |
|--------|--------|-------|
| Premium conversion (free → paid) | 3–5% | % of free users → premium |
| Premium conversion (leads → paid) | 10–15% | % of emails captured → premium |
| Premium ARPU | $18/month | Blended average (9/19/29 tiers) |
| Premium churn | <3% monthly | Retention > 97% month-over-month |
| Enterprise pipe | 3+ prospects | Conversations with $500K+ potential |

### Growth

| Metric | Target | Notes |
|--------|--------|-------|
| MoM growth rate | 20% | Month-over-month audit growth |
| Organic share of audits | 80%+ | Audits from organic channels |
| Email signup rate | 5–10% | % of audits that lead to email capture |
| Viral coefficient | 1.2+ | Each user brings 1.2 new users |

---

## Business Metrics

### Revenue

**Monthly Recurring Revenue (MRR)**
- Calculation: (Premium Users × ARPU) + Enterprise MRR
- Target: $0 → $1K (month 6) → $5K (month 12)

**Annual Recurring Revenue (ARR)**
- Calculation: MRR × 12
- Target: $15K year 1, $60K year 2

**Customer Acquisition Cost (CAC)**
- Calculation: Marketing spend / New customers
- Target: $0 (organic), <$100 (paid)
- Payback period: CAC / (Monthly contribution margin)

**Customer Lifetime Value (LTV)**
- Calculation: (ARPU × Gross Margin) / Monthly Churn Rate
- Target: $648 (premium), $120K (enterprise)
- LTV:CAC ratio > 3:1

### Cohort Analysis

**Cohort 1: Month 1 Users**
- Retention (active 30d later): 5%
- Premium conversion: 2%
- Audit repeat rate: 3%

**Cohort 2: Month 2 Users**
- Retention: 6%
- Premium conversion: 4%
- Audit repeat rate: 4%

**Trend**: Should show improving retention as product improves

---

## Acquisition Metrics

### Traffic

| Channel | Target (Month 1) | Target (Month 6) | Notes |
|---------|---|---|---|
| Organic search | 200 | 1,000 | Blog content + SEO |
| Direct | 100 | 300 | Users typing URL directly |
| Referral | 50 | 200 | Word of mouth + public URLs |
| Social | 0 | 200 | Twitter, LinkedIn, communities |
| Paid (if active) | 0 | 300 | Google Ads, LinkedIn |

### CAC by Channel

| Channel | CAC | LTV:CAC | Viability |
|---------|-----|---------|-----------|
| Organic | $0 | ∞ | ✅ Primary |
| Referral | $5–20 | 30+:1 | ✅ Secondary |
| Social | $20–50 | 10+:1 | ✅ Potential |
| Paid Search | $50–150 | 4:1 | ⚠️ Marginal |
| LinkedIn Ads | $100–300 | 2:1 | ⚠️ Monitor |

---

## Retention Metrics

### Free Users

**30-Day Retention**
- Target: 20%
- Definition: Users who audit more than once in 30 days
- Reason: Many users are one-time auditors (annual check-in)

**90-Day Retention**
- Target: 10%
- Definition: Users who audit 90+ days after first audit
- Reason: Signals infrequent but recurring need

### Premium Users

**30-Day Retention**
- Target: 97%+ (3% monthly churn)
- Definition: Premium subscribers active in month 2
- Reason: Premium should have lower churn (recurring value)

**12-Month Retention**
- Target: 80%+
- Definition: Premium subscribers active after 12 months
- Reason: Ultimate test of product stickiness

### Churn Analysis

**Cancellation reasons**:
- "Found savings, don't need to audit again" (positive churn)
- "Forgot I had subscription" (engagement issue)
- "Too expensive" (pricing issue)
- "Switched tools" (feature gap)

---

## Marketing Metrics

### Content

| Metric | Target | Notes |
|--------|--------|-------|
| Blog posts published | 2/month | SEO + thought leadership |
| Backlinks | 10+ in year 1 | Authority building |
| Organic search traffic | 500+ by month 6 | Long-tail keywords |
| Email newsletter subscribers | 1K+ | Leads for future launches |

### Community

| Metric | Target | Notes |
|--------|--------|-------|
| Twitter followers | 500+ | Founder account |
| LinkedIn followers | 200+ | Company page |
| Reddit mentions | 10+ | Organic community mentions |
| Slack/Discord mentions | Tracking | Community adoption signal |

### PR & Partnerships

| Metric | Target | Notes |
|--------|--------|-------|
| Press mentions | 3–5 | Tech + finance blogs |
| Partnerships | 2–3 | Finance software integrations |
| Speaking opportunities | 1–2 | Conferences or podcasts |

---

## Product Development Metrics

### Velocity

**Sprint Metrics** (if agile):
- Burndown: Consistent velocity sprint-to-sprint
- Deployment frequency: 1–2x per week
- Lead time: Feature request → shipped < 2 weeks

### Quality

**Code Quality**:
- Test coverage: >80% for audit engine
- CI/CD pass rate: >95%
- Zero critical bugs in production (target)

**Performance**:
- Audit generation: <100ms (p95)
- API response time: <200ms (p95)
- Lighthouse Performance: ≥85

---

## Dashboard Setup

### Real-Time Dashboard (Week 1)

Display on office monitor:

```
TODAY'S AUDITS: 12
WEEKLY: 85
PREMIUM USERS: 3
MRR: $54
```

### Weekly Review (Every Friday)

| Metric | This Week | Last Week | Trend |
|--------|-----------|-----------|-------|
| Audits | 120 | 100 | ↑ 20% |
| Premium Conversions | 4 | 3 | ↑ 33% |
| Email Signups | 8 | 5 | ↑ 60% |
| Public Shares | 48 | 40 | ↑ 20% |
| Support Issues | 0 | 0 | ✅ |

### Monthly Review (End of Month)

**Qualitative**:
- Customer feedback themes
- Feature requests (top 3)
- Wins + highlights
- What surprised us?

**Quantitative**:
- All metrics from above
- Cohort analysis
- Comparison vs. previous month + YoY

---

## Fundraising Metrics

If raising capital, prepare:

### For Investors

**Traction** (Month 3):
- 500+ cumulative audits
- 10+ email signups
- 0 critical issues
- Founder + 1 early user interview

**Validation** (Month 6):
- 2,000+ cumulative audits
- 50+ email signups
- 3–5 premium subscribers ($100 MRR)
- 10+ user interviews confirming fit

**Scale** (Month 12):
- 10,000+ cumulative audits
- 200+ email signups
- 50+ premium subscribers ($900 MRR)
- 3+ enterprise conversations

---

## Alerts & KPI Thresholds

### Red Flags (Immediate Action Required)

- **Audits/week < 50** — Product not resonating
- **Premium conversion < 1%** — Freemium model failing
- **Premium churn > 5% monthly** — Product issue
- **Support issues > 3 critical** — Product quality concern
- **Lighthouse Performance < 80** — UX degradation

### Yellow Flags (Monitor)

- **Audits/week < 100** — Growth slower than expected
- **Premium conversion < 2%** — Below target
- **Email signup rate < 3%** — Lead capture weak
- **Public share rate < 30%** — Sharing not compelling

### Green Flags (Accelerate)

- **Audits/week > 200** — Strong organic growth
- **Premium conversion > 5%** — Exceeding targets
- **Email signup rate > 10%** — Strong lead generation
- **Public share rate > 50%** — Highly shareable product

---

## Reporting Cadence

### Daily
- Audits run
- Critical errors

### Weekly
- All engagement metrics
- Feature requests
- User feedback themes

### Monthly
- Full dashboard review
- Cohort analysis
- Roadmap prioritization

### Quarterly
- Investor update (if applicable)
- Board meeting
- Strategy review

---

## Success Definition

### 3-Month Benchmark

**Product-Market Fit**:
- ✅ 1,000+ audits
- ✅ 20%+ free-to-paid conversion
- ✅ <3% critical support issues
- ✅ 40%+ public share rate

### 6-Month Benchmark

**Market Validation**:
- ✅ 5,000+ audits
- ✅ 3%+ premium conversion (sustained)
- ✅ $2K–$5K MRR
- ✅ 10+ user interviews confirming fit
- ✅ First case study published

### 12-Month Benchmark

**Business Viability**:
- ✅ 50,000+ audits
- ✅ $10K–$20K MRR
- ✅ 500+ organic SEO visitors/month
- ✅ 3+ enterprise conversations
- ✅ Positive unit economics (LTV:CAC > 3:1)

---

## Next Steps

1. Set up real-time dashboard (Plausible Analytics or Metabase)
2. Configure alerts in Slack (daily summary)
3. Schedule weekly metric review (Friday 4pm)
4. Monthly founder review: All metrics + cohorts + feedback themes
5. Quarterly: Investor/board presentation prep