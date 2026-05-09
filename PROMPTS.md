# Prompts

## Audit Summary Prompt

File: `src/lib/ai/summary-prompt.ts`

Purpose: generate a concise, founder-friendly summary of an already-computed audit result. The LLM is used only for personalization and summarization, not for core recommendations or savings calculations.

Actual prompt:

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
