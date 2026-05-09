import { z } from 'zod';

export const toolInputSchema = z.object({
  toolId: z.string(),
  planId: z.string(),
  monthlySpend: z.number().min(0),
  seats: z.number().min(1),
});

export const auditInputSchema = z.object({
  tools: z.array(toolInputSchema),
  teamSize: z.number().min(1),
  primaryUseCase: z.string(),
});