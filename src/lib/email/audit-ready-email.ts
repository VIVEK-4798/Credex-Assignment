import { Resend } from 'resend';
import { formatCurrency } from '@/lib/utils/formatters';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

export async function sendAuditReadyEmail(input: {
  to: string;
  result: AuditResult;
  resultsUrl: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || 'Credex <onboarding@resend.dev>';
  const topRecommendation = input.result.recommendations[0];

  await resend.emails.send({
    from,
    to: input.to,
    subject: 'Your AI Spend Audit is ready',
    html: buildAuditReadyHtml({
      result: input.result,
      resultsUrl: input.resultsUrl,
      topRecommendation: topRecommendation?.title,
    }),
    text: buildAuditReadyText({
      result: input.result,
      resultsUrl: input.resultsUrl,
      topRecommendation: topRecommendation?.title,
    }),
  });

  return { sent: true };
}

function buildAuditReadyHtml({
  result,
  resultsUrl,
  topRecommendation,
}: {
  result: AuditResult;
  resultsUrl: string;
  topRecommendation?: string;
}) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:560px;margin:0 auto;padding:24px">
      <p style="font-size:14px;color:#475569">Your AI Spend Audit is ready</p>
      <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px">Potential savings: ${formatCurrency(result.estimatedAnnualSavings)}/year</h1>
      <p>Your report found ${result.recommendations.length} practical optimization ${result.recommendations.length === 1 ? 'opportunity' : 'opportunities'} across ${result.tools.length} AI ${result.tools.length === 1 ? 'tool' : 'tools'}.</p>
      ${
        topRecommendation
          ? `<p><strong>Top action:</strong> ${topRecommendation}</p>`
          : '<p>Your current stack appears reasonably optimized. Keep monitoring seats and plan changes as your team grows.</p>'
      }
      <p><a href="${resultsUrl}" style="display:inline-block;background:#0f172a;color:white;text-decoration:none;padding:12px 16px;border-radius:8px">View audit results</a></p>
      <p style="font-size:14px;color:#475569">Credex can help validate the savings before you change plans or vendors.</p>
    </div>
  `;
}

function buildAuditReadyText({
  result,
  resultsUrl,
  topRecommendation,
}: {
  result: AuditResult;
  resultsUrl: string;
  topRecommendation?: string;
}) {
  return [
    'Your AI Spend Audit is ready.',
    `Potential annual savings: ${formatCurrency(result.estimatedAnnualSavings)}.`,
    topRecommendation
      ? `Top action: ${topRecommendation}.`
      : 'Your current stack appears reasonably optimized.',
    `View results: ${resultsUrl}`,
    'Credex can help validate the savings before you change plans or vendors.',
  ].join('\n\n');
}
