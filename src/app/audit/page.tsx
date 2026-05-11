'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ToolSelector } from '@/components/forms/tool-selector';
import { ToolCard } from '@/components/forms/tool-card';
import { TeamDetailsForm } from '@/components/forms/team-details-form';
import { AuditSubmitButton } from '@/components/forms/audit-submit-button';
import { useAuditStore } from '@/store/audit-store';
import { generateAuditReport } from '@/lib/utils/mock-audit-generator';

export default function AuditPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Zustand store - use individual selectors to avoid infinite loop
  const tools = useAuditStore((state) => state.tools);
  const teamSize = useAuditStore((state) => state.teamSize);
  const primaryUseCase = useAuditStore((state) => state.primaryUseCase);
  const addTool = useAuditStore((state) => state.addTool);
  const removeTool = useAuditStore((state) => state.removeTool);
  const setTeamSize = useAuditStore((state) => state.setTeamSize);
  const setPrimaryUseCase = useAuditStore((state) => state.setPrimaryUseCase);

  // Hydrate store from localStorage
  useEffect(() => {
    void Promise.resolve(useAuditStore.persist.rehydrate()).then(() => {
      setIsHydrated(true);
    });
  }, []);

  const handleGenerateAudit = async (data: {
    teamSize: number;
    primaryUseCase: string;
    website?: string;
  }) => {
    setIsLoading(true);

    // Update store with team info
    setTeamSize(data.teamSize);
    setPrimaryUseCase(data.primaryUseCase);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate audit
    const auditResult = generateAuditReport(
      tools,
      '',
      '',
      data.teamSize,
      data.primaryUseCase
    );

    const savedAudit = await saveAudit({
      ...auditResult,
      website: data.website,
    });
    const publicId = savedAudit?.publicId || auditResult.id;

    const publicAuditResult = {
      ...auditResult,
      id: publicId,
      company: '',
      email: '',
      aiSummary: '',
    };

    localStorage.setItem('audit-result', JSON.stringify(publicAuditResult));

    router.push(`/results/${publicId}`);

    setIsLoading(false);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">AI Spend Audit</h1>
          <p className="text-gray-600 mt-1">
            Tell us about your AI tools and we&apos;ll find savings.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tool Selection */}
              <Card className="p-8 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your AI Tools
                </h2>

                {tools.length === 0 && (
                  <div className="text-center py-8 px-4">
                    <p className="text-gray-500 mb-4">
                      Add your first AI tool to begin your audit.
                    </p>
                  </div>
                )}

                {tools.length > 0 && (
                  <div className="mb-8 space-y-3">
                    {tools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onRemove={removeTool}
                      />
                    ))}
                  </div>
                )}

                <ToolSelector onAddTool={addTool} existingTools={tools} />
              </Card>

              {/* Team Info Form */}
              {tools.length > 0 && (
                <TeamDetailsForm
                  onSubmit={handleGenerateAudit}
                  defaultValues={{
                    teamSize,
                    primaryUseCase,
                  }}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <AuditSubmitButton
                tools={tools}
                teamSize={teamSize}
                isLoading={isLoading}
                onSubmit={() => {
                  // Trigger form submission via the form
                  const form = document.querySelector(
                    'form'
                  ) as HTMLFormElement;
                  if (form) {
                    form.dispatchEvent(
                      new Event('submit', { bubbles: true, cancelable: true })
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

async function saveAudit(auditResult: unknown): Promise<{ publicId: string } | null> {
  try {
    const response = await fetch('/api/audits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auditResult),
    });

    if (!response.ok) return null;

    return (await response.json()) as { publicId: string };
  } catch {
    return null;
  }
}
