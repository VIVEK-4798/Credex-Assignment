# Architecture Notes

## Abuse Protection

The app uses lightweight abuse protection that is appropriate for the current assignment scope:

- Honeypot fields are included in the audit form and lead capture modal. Real users do not see them; bot submissions that fill them are silently accepted but ignored.
- API routes use in-memory rate limiting by IP-derived request key for audit saving, lead capture, and AI summary generation.

This avoids overengineering while protecting the most obvious unauthenticated endpoints. For production scale, move rate limiting to an external store such as Upstash Redis, Vercel KV, or Supabase-backed request logs.

## Public Audit Privacy

Shared result URLs use a generated `public_id` and sanitized `results_json`. Public pages do not expose email or company name. Lead data is stored separately in the `leads` table.
