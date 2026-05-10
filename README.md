# AI Spend Audit

**Uncover hidden AI spending, reclaim budget, and optimize your tech stack.**

AI Spend Audit is a lightweight, no-login audit tool that analyzes your organization's AI tool portfolio and identifies immediate cost optimization opportunities. Get a detailed breakdown of your spending, uncover redundancies, and receive prioritized recommendations—all in seconds.

## The Problem

Teams are adopting AI tools rapidly, often without visibility into total spend:

- **Fragmented tools**: ChatGPT + Claude + Perplexity + custom integrations
- **Forgotten subscriptions**: Unused seats on expensive plans  
- **Overlapping capabilities**: Paying for 3 LLMs doing the same work
- **No easy audit path**: Spreadsheets and manual tracking waste time

Studies show SaaS wastage averages **30%** in mid-market companies. For AI tools, it's often higher.

## The Solution

AI Spend Audit provides:

1. **Fast, honest audits** — No onboarding required. Start in seconds.
2. **Clear spending breakdown** — Itemized by tool, plan, team size, usage
3. **Prioritized recommendations** — Downgrade, consolidate, or optimize with confidence scores
4. **Shareable reports** — Public URL to share findings with finance/procurement teams
5. **Privacy-first** — No email required for public reports; lead data kept separate

## Quick Start

### For Users

Visit the app, enter your AI tool portfolio:

```
1. Select tools you're paying for (ChatGPT, Claude, Perplexity, etc.)
2. Input your plan tier and monthly spend
3. Get an instant audit with savings estimates and confidence scores
4. Share the report with stakeholders
```

### For Developers

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

**Environment Variables** (required for full functionality):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_api_key
RESEND_API_KEY=your_resend_api_key
```

## Key Features

### Audit Engine

- **Confidence-scored recommendations** — Not all savings are equal. Recommendations include effort level and implementation difficulty
- **Contextual rules** — Considers team size, primary use case, tool capabilities, and feature overlap
- **Anti-exaggeration** — Never overstates savings or recommends bad trades (e.g., losing critical capability to save $10/month)

### Shared Reports

- **Public URLs** — Generate a shareable audit result without storing PII
- **Sanitized data** — Reports show tool stack and savings, not email or company name
- **Quick feedback** — Lead capture for further engagement (separate from public report)

### No-Auth Design

- **Fast experience** — No signup friction
- **Honeypot protection** — Lightweight anti-bot validation  
- **Rate limiting** — Per-IP limits on audit generation and lead capture

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed technical design, abuse protection, and data flow.

## Performance & Quality

- **CI/CD**: Automated linting, testing, and type checking on every push ([.github/workflows/ci.yml](.github/workflows/ci.yml))
- **Lighthouse**: Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 90
- **Test coverage**: Comprehensive audit engine tests with edge case handling
- **Type safety**: Full TypeScript with Zod validation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI API (structured audit summaries)
- **Email**: Resend
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9

## Project Structure

```
src/
├── app/              # Next.js App Router pages & API routes
├── components/       # Reusable React components
│   ├── audit/        # Audit-specific UI (results, metrics, etc.)
│   ├── forms/        # Form components (audit form, team details)
│   └── ui/           # Base UI primitives (buttons, cards, etc.)
├── lib/
│   ├── audit-engine/ # Core audit logic & recommendations
│   ├── ai/           # OpenAI integration & prompts
│   ├── supabase/     # Database layer
│   └── utils/        # Shared utilities
├── types/            # TypeScript interfaces
├── constants/        # Configuration & thresholds
└── tests/            # Unit tests
```

## Contributing & Development

### Running Tests

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # Coverage report
```

### Linting & Formatting

```bash
npm run lint                # Run ESLint
npx prettier --write .      # Auto-format
```

### Building for Production

```bash
npm run build
npm start
```

## Roadmap

- [ ] Bulk audit import (CSV/JSON)
- [ ] Audit history & trend tracking
- [ ] Slack integration for budget alerts
- [ ] Multi-team management dashboard
- [ ] Detailed cost forecasting by use case

## Economics & Impact

### User Economics

- **Typical savings**: $2K–$10K/year per small-to-mid-size team
- **Effort to implement**: 1–4 hours (mostly communication)
- **ROI breakeven**: < 1 month

### Business Model

- Free audit tool (acquisition channel)
- Premium: Audit history, team management, integrations (coming soon)
- Enterprise: Bulk audit, procurement integrations, dedicated support

*See [ECONOMICS.md](ECONOMICS.md) for detailed unit economics.*

## User Feedback

> "We found $8K in unused ChatGPT Team seats. This tool paid for itself immediately." — Finance Manager, Series B SaaS

> "Exactly what we needed to justify our AI tool stack to leadership." — Head of Product, Startup

*See [USER_INTERVIEWS.md](USER_INTERVIEWS.md) for full interview notes.*

## Go-to-Market

This tool targets:

1. **Finance teams** — Cost visibility and control
2. **Tech leads** — Optimize team AI tool portfolio  
3. **SaaS founders** — Reduce bloat early
4. **Enterprise procurement** — Tool rationalization

See [GTM.md](GTM.md) for customer acquisition strategy and positioning.

## License

MIT

---

**Questions?** Open an issue or check [ARCHITECTURE.md](ARCHITECTURE.md) for technical deep dives.
