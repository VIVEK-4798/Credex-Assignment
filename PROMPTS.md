# AI Strategy & Prompt Engineering

## The Core Philosophy

**AI is for polish, not for core logic.**

Core audit recommendations must be:
- ✅ Deterministic (same input → same output always)
- ✅ Explainable (user can understand *why*)
- ✅ Auditable (financial decision, needs transparency)
- ✅ Testable (deterministic = easy to test edge cases)

**AI is perfect for**:
- Summarizing structured recommendations into prose
- Explaining complex concepts to non-technical users
- Adding conversational polish without changing the product

---

## Why NOT AI for Core Logic

### The Hallucination Problem

**Scenario**: User audits their stack.

**Bad Approach** (AI-driven):
```
System prompt: "Analyze this AI tool stack and recommend optimizations. 
Prioritize cost savings."

User input: ChatGPT Team ($100/2 seats) + Claude Pro ($20/1 seat)

Possible outputs:
Day 1: "Consolidate to Claude only, save $100/month"
Day 2: "Consolidate to ChatGPT only, save $20/month"
Day 3: "Cancel Claude, it's redundant"

Why different?
- GPT has inherent variability (temperature, sampling)
- Prompt is ambiguous (what does "prioritize" mean exactly?)
- No grounding in data (pricing, feature comparison)
```

**Result**: User runs audit twice, gets different answers. Tool is broken.

**Good Approach** (Deterministic):
```
Rule: If tool_a_capability ⊂ tool_b_capability AND tool_a_cost > tool_b_cost
  → Recommend downgrade

Implementation:
- Define capability matrix (ChatGPT Team = {chat, api, custom_gpt})
- Define tool costs (known values)
- Run deterministic logic
- Assign confidence based on actual criteria

Result: Same input → same output always. Tool is trustworthy.
```

### The Explainability Problem

**User's Question**: "Why are you recommending I cancel Claude?"

**Bad Answer** (AI-generated):
- "Based on my analysis of your usage patterns..."
- Vague, hand-wavy, can't be verified

**Good Answer** (Deterministic):
- "You have Claude Pro ($20/month) and ChatGPT Team ($150/month for 2 people)"
- "ChatGPT Team has all capabilities of Claude Pro for your team size"
- "Consolidating saves $20/month"
- "Confidence: 0.65 (requires workflow change to validate)"

**User's trust**: Good answer wins. Reason: I can verify the logic.

### The Auditability Problem

**Scenario**: User implements the recommendation and something goes wrong.

**Bad Answer** (AI-generated):
- "The AI recommended it" (not an explanation)
- No audit trail of why
- Blame the AI

**Good Answer** (Deterministic):
- Exact rules that triggered recommendation
- Scoring criteria used
- Confidence thresholds applied
- Can replay the logic given same input
- Blame is on us, not on AI

---

## Where AI Adds Value: Summarization

### The Use Case

**Input** (structured JSON from deterministic engine):
```json
{
  "type": "downgrade",
  "toolId": "chatgpt",
  "currentPlan": "Team",
  "recommendedPlan": "Plus",
  "monthlySavings": 80,
  "confidence": 0.95,
  "reason": "Team is small (2 people). ChatGPT Plus covers all your needs."
}
```

**Output** (prose, human-readable):
```
"Your team is small enough that individual ChatGPT Plus subscriptions 
will provide the same capabilities as ChatGPT Team, while saving $80/month. 
Since you have 2 people, moving to Plus is a straightforward upgrade path 
with no feature loss."
```

**Why AI Works Here**:
- ✅ No decisions being made (already made by deterministic engine)
- ✅ No hallucination risk (input is structured, output is prose only)
- ✅ No variability allowed (must be consistent, but doesn't matter if slightly different wording)
- ✅ Adds UX polish without changing product behavior

---

## Prompt Engineering: Structured Recommendations

### Primary Prompt: Audit Summary

**File**: `src/lib/ai/summary-prompt.ts`

**Purpose**: Generate a concise summary of an already-computed audit result. The LLM is used only for personalization and summarization, not for core recommendations or savings calculations.

**Actual Prompt**:

```text
Summarize this AI spend audit for a startup founder.

Be concise, practical, and financially grounded.
Avoid hype language.
Avoid generic AI transformation language.
Mention major savings opportunities and stack inefficiencies.
Do not invent recommendations, vendors, pricing, or savings.
Keep the summary to 2 short paragraphs.
```

Key constraints:

- Be concise, practical, and financially grounded.
- Avoid hype language and generic AI transformation language.
- Mention major savings opportunities and stack inefficiencies.
- Do not invent recommendations, vendors, pricing, or savings.
- Keep the summary to 2 short paragraphs.

Why this prompt is written this way:

- The audit engine already computes recommendations deterministically.
- The model is only allowed to personalize and summarize the computed result.
- The language is intentionally founder-focused: short, operational, and financially grounded.

Failed prompt attempts avoided:

- “Make this exciting and persuasive” created exaggerated marketing copy.
- “Find additional savings” risked inventing recommendations outside the audit engine.
- “Write a detailed report” produced too much text for a screenshot-friendly results page.

Fallback: `src/lib/ai/fallback-summary.ts` returns deterministic copy when no API key is configured or summary generation fails.
