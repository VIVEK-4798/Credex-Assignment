import { getPublicAuditResult } from '@/lib/supabase/audits';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await getPublicAuditResult(id);

  if (!result) {
    return Response.json({ result: null }, { status: 404 });
  }

  return Response.json({ result });
}
