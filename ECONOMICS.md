# Economics & Business Model

## Market Size & Opportunity

### TAM (Total Addressable Market)

**Segment 1: SMB Finance Teams (5–500 employee companies)**
- US: ~330,000 companies
- ~50% have 5+ employees adopting AI tools
- TAM: ~165,000 companies
- Average annual AI spend: $5K–$50K

**Segment 2: Enterprise Procurement (500+ employees)**
- US: ~5,000 companies
- ~80% have enterprise AI spend management needs
- TAM: ~4,000 companies
- Average annual AI spend: $500K–$5M+

**Total TAM**: ~$2–5B annually (conservative estimate)

### SAM (Serviceable Addressable Market)

Focus on SMB + mid-market first:
- Easier to reach (less sales complexity)
- Faster to monetize (transparent self-serve pricing)
- Better metrics visibility (small enough to track every customer)

**Initial SAM**: ~50,000 companies (10% of TAM)
- $250M–$500M market for audit + optimization

---

## Unit Economics

### CAC (Customer Acquisition Cost)

**Phase 1 (Organic only)**
- SEO + content marketing
- CAC: $0 (organic traffic only)
- Conversion rate: 40–50% (no friction)
- Cost to acquire customer: $0

**Phase 2 (Paid channels)**
- Google Search ads + LinkedIn
- CAC: $50–200 per paying customer (projected)
- Conversion rate: 2–5% (lower than organic)

**Phase 3 (Enterprise sales)**
- Direct sales team
- CAC: $5K–50K per enterprise deal
- But: Higher LTV justifies it

### LTV (Customer Lifetime Value)

**Free tier users**:
- Run 1 audit
- LTV: $0 (but valuable as word-of-mouth channel)

**Premium tier ($9–29/month)**:
- Pays for history + audit trends + team collaboration
- Blended ARPU: $18/month ($216/year)
- Average lifetime: 3 years (conservative)
- Churn: 3% monthly
- LTV: $216 × 3 = $648

**Enterprise tier ($500–5K/month)**:
- API access + integrations + support
- ARPU: $2K/month ($24K/year)
- Average lifetime: 5 years (sticky contracts)
- Churn: 0.5% monthly
- LTV: $24K × 5 = $120K

### LTV:CAC Ratio

| Segment | CAC | LTV | Ratio |
|---------|-----|-----|-------|
| Organic → Free | $0 | $0 | N/A |
| Organic → Premium | $0 | $648 | ∞ |
| Paid → Premium | $100 | $648 | 6.5:1 |
| Paid → Enterprise | $5K | $120K | 24:1 |

**Healthy ratio**: 3:1 or better. We're exceeding that significantly.

---

## Revenue Model

### Freemium Pricing

**Free Tier** (default)
- 1 audit per session
- Public sharing via URL
- Basic recommendations
- No email required
- No account needed

**Premium Tier** ($9/month)
- Unlimited audits
- Private audit history
- Trend tracking (month-over-month)
- Saved recommendations
- Email alerts for spending changes
- Export to CSV

**Pro Tier** ($29/month)
- Everything in Premium
- Team collaboration (invite members)
- Advanced analytics
- Historical cost forecasting
- Priority support

**Enterprise Tier** (custom)
- API access to audit engine
- Bulk audit import (CSV/JSON)
- Procurement system integration
- SAML/SSO
- Custom reporting + dashboards
- Dedicated support
- Starting at $500/month

### Conversion Assumptions

| Metric | Value | Notes |
|--------|-------|-------|
| Free to Premium conversion | 3–5% | Users who value history + alerts |
| Premium to Pro conversion | 2–3% | Larger teams wanting collaboration |
| Free to Enterprise conversion | 0.5–1% | Enterprise features + support |
| Free tier retention | 20% | Re-auditors (annual check) |
| Premium tier retention | 80% | Sticky; integral to workflow |
| Enterprise retention | 95% | Lock-in via integration |

---

## Financial Projections (Year 1)

### Assumptions

- Launch: Month 1
- Organic SEO growth: 20% month-over-month (declining as market saturates)
- Premium conversion: 4% (midpoint)
- Free retention: 20%
- Starting with zero paid acquisition (phase 2)

### Year 1 Revenue Forecast

| Month | Audits | Premium Users | Revenue | Notes |
|-------|--------|---------------|---------|-------|
| 1 | 500 | 0 | $0 | Launch, initial traction |
| 2 | 600 | 20 | $180 | Early adopters |
| 3 | 720 | 35 | $315 | SEO momentum |
| 4 | 865 | 52 | $468 | Viral growth slowing |
| 5 | 1,039 | 70 | $630 | Steady organic |
| 6 | 1,247 | 92 | $828 | 6-month retention visible |
| 7 | 1,496 | 118 | $1,062 | |
| 8 | 1,795 | 148 | $1,332 | |
| 9 | 2,154 | 184 | $1,656 | |
| 10 | 2,585 | 227 | $2,043 | |
| 11 | 3,102 | 279 | $2,511 | |
| 12 | 3,722 | 342 | $3,078 | YoY: $15,103 |

**Year 1 Revenue: ~$15K**
- Mostly premium conversions
- No paid acquisition yet
- Conservative growth (assumes minimal viral)

### Year 2 Projections

With paid acquisition + improved product:

| Quarter | Audits | Premium Users | Enterprise ARR | Total Revenue |
|---------|--------|---------------|----------------|---------------|
| Q1 | 5K | 400 | $0 | $3.6K |
| Q2 | 8K | 650 | $5K | $7.85K |
| Q3 | 12K | 950 | $15K | $11.55K |
| Q4 | 18K | 1,400 | $30K | $16.74K |

**Year 2 Revenue: ~$39K**
- Premium growth + first enterprise deals
- Paid acquisition ramping
- Better retention visible

### Year 3 Projections

Scale + enterprise focus:

**Year 3 Revenue: $150K–$300K+**
- 50K+ monthly audits
- 5K+ premium subscribers @ $216/year = $108K MRR
- 5–10 enterprise deals @ $24K/year = $120K–$240K
- Total ARR: $250K–$350K

---

## Operating Costs

### Fixed Costs (Monthly)

| Item | Cost | Notes |
|------|------|-------|
| Supabase (database) | $25–100 | Scales with usage; starts low |
| Vercel (hosting) | $20–50 | Pro plan; auto-scaling |
| OpenAI API | $100–500 | Pay-per-call; scales with audits |
| Domain + email | $15 | Fixed |
| Resend (email service) | $5–20 | Scales with email volume |

**Total Fixed: $165–$670/month** (or $2K–$8K annually at scale)

### Variable Costs (Per Customer)

| Item | Cost | Margin Impact |
|------|------|----------------|
| Premium hosting | $0.10 per user-month | Negligible |
| OpenAI summary generation | $0.01 per audit | < 1% of revenue |
| Email infrastructure | $0.01 per email | < 1% of revenue |

**Total variable cost**: < 5% of revenue at scale

### Unit Economics at Scale

At 50K monthly audits + 5K premium users:

| Metric | Value |
|--------|-------|
| Monthly revenue | $7,200 |
| COGS | $300 |
| Gross margin | 95.8% |
| Fixed operating costs | $500 |
| Net margin | 93% |

**This is an exceptional margin business** (typical SaaS: 60–70%)

---

## Funding & Path to Profitability

### Phase 1: Bootstrap (Now – Month 6)

- **Investment**: Founder time only
- **Burn rate**: $0
- **Goal**: Validate product-market fit, gather user feedback
- **Exit criteria**: 1,000+ audits/month, clear demand signal

### Phase 2: Friends & Family (Month 6–12)

- **Raise**: $50K–$100K (if needed)
- **Use**: Accelerate growth, hire contractor for paid ads
- **Goal**: Prove repeatable unit economics
- **Exit criteria**: $5K–$10K MRR from premium + organic traction

### Phase 3: Seed Round (Year 2)

- **Raise**: $500K–$1M (if pursuing VC path)
- **Use**: Sales team for enterprise, marketing spend, product development
- **Goal**: Enterprise customers, $50K+ MRR
- **Exit criteria**: Clear path to Series A

### Path to Profitability (No VC)

- **Breakeven**: Month 4–6 (conservative estimate)
- **ROI**: Positive within first year on any capital invested
- **Trajectory**: Self-sustaining by year 2

This business is profitable without raising capital if we:
- Keep costs low (proven with high-margin model)
- Focus on organic growth (proven with SEO potential)
- Monetize carefully (don't over-charge early customers)

---

## Competitive Economics

### vs. Manual Spreadsheet Audit

| Factor | Manual | AI Spend Audit |
|--------|--------|----------------|
| Time to audit | 4–8 hours | 2 minutes |
| Accuracy | 70–80% | 95%+ |
| Cost | 1–2 hours finance labor ($100–200) | Free / $9/month |
| Sharing | Email spreadsheet | Public URL instantly |

**Win**: Obvious on time + ease. Users will adopt.

### vs. Procurement SaaS (Coupa, Emburse, etc.)

| Factor | Coupa | AI Spend Audit |
|--------|-------|----------------|
| Onboarding | Weeks (consulting) | Seconds (no setup) |
| Cost | $10K–$100K annually | Free / $29/month |
| AI focus | Generic tool rationalization | AI tool-specific |
| Freemium | No | Yes |

**Win**: Speed + price. Procurement platforms will eventually acquire companies like ours or build it.

### vs. Homegrown Solutions

Many enterprises build their own audit tools. Why they'll consider us:
- Faster to deploy than custom build
- Maintenance-free (we handle tool pricing updates)
- Benchmarks (we have aggregate data; they can see if they're overspending)
- Team collaboration features (they don't have time to build this)

---

## Pricing Sensitivity Analysis

### Premium Price Elasticity

Assumption: At $9/month, 4% conversion rate

| Price | Conversion | Revenue per Customer | Annual Revenue (100K audits) |
|-------|------------|----------------------|-----------------------------|
| $5 | 6% | $60 | $30K |
| $9 | 4% | $108 | $39K |
| $19 | 2% | $152 | $30K |
| $29 | 1% | $174 | $17K |

**Optimal**: $9–$19 range. We chose $9 to maximize adoption; can increase as value is proven.

### Enterprise Price Elasticity

Assumption: Value is high ($2K–$10K annual savings per company)

Proposal: Charge 10–20% of annual savings

| Annual Savings | 10% | 15% | 20% |
|---|---|---|---|
| $10K | $1K | $1.5K | $2K |
| $50K | $5K | $7.5K | $10K |
| $100K | $10K | $15K | $20K |

**Sweet spot**: $500–$5K/month for enterprise (we can adjust based on customer size)

---

## Risk Factors

### Revenue Risks

1. **Freemium conversion is lower than 4%** (0.5% = $1.5K instead of $39K)
   - Mitigation: Email capture for premium upsell; consider free trial period

2. **Enterprise not interested in premium product** (focus only on free audit)
   - Mitigation: Build specialized enterprise version; focus on API

3. **Market is smaller than projected** (not 50K serviceable companies)
   - Mitigation: Pivot to vertical SaaS (finance-specific, procurement-specific)

### Cost Risks

1. **OpenAI API becomes expensive** (6x current cost)
   - Mitigation: Switch to cached summaries or open-source models

2. **Database costs balloon** (unexpected scale)
   - Mitigation: Self-host, optimize queries, implement caching

3. **Paid acquisition proves expensive** (CAC $300+ for premium)
   - Mitigation: Stay organic, or focus enterprise which has higher LTV

---

## Success Metrics

### Health Metrics (Monthly)

- Active audits > 1K
- Free-to-premium conversion > 2%
- Premium retention > 70% month-over-month
- CAC < $100 for paid channels
- API error rate < 0.1%

### Business Metrics (Quarterly)

- ARR growth > 20% month-over-month
- Premium ARPU > $15/month
- Enterprise pipelines: 3+ prospects
- Customer acquisition cost < $50 (organic only)
- Gross margins > 85%

### Product Metrics (Monthly)

- Audit accuracy (user satisfaction > 80%)
- Recommendation adoption (users act within 2 weeks: >30%)
- Public share rate (audits shared > 40%)
- User feedback: 0 critical issues, avg satisfaction > 4/5

---

## Funding Ask (If Raising)

**$500K Seed**

Use of funds:
- 40% ($200K): Sales + marketing for enterprise
- 30% ($150K): Product development (team collab, integrations)
- 20% ($100K): Team expansion (1 engineer, 1 sales)
- 10% ($50K): Operations + infrastructure

This gets us to $100K+ ARR in 12–18 months, enabling Series A.

---

## Conclusion

This is a **capital-efficient, high-margin business** with:
- ✅ Clear problem + validated by users
- ✅ Recurring revenue model (freemium + premium)
- ✅ 95%+ gross margins (rare for SaaS)
- ✅ Path to profitability without VC (but can scale faster with capital)
- ✅ $250M+ serviceable market

The bet: Build a beloved product for SMB finance + engineering teams, graduate to enterprise, become the standard for AI spend management.