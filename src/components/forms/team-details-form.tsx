'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const teamDetailsSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  teamSize: z.number().min(1, 'Team size must be at least 1'),
  primaryUseCase: z.string().min(1, 'Primary use case is required'),
});

type TeamDetailsFormData = z.infer<typeof teamDetailsSchema>;

interface TeamDetailsFormProps {
  onSubmit: (data: TeamDetailsFormData) => void;
  defaultValues?: Partial<TeamDetailsFormData>;
  isLoading?: boolean;
}

const USE_CASES = [
  'Product Development',
  'Content Creation',
  'Data Analysis',
  'Customer Support',
  'Research',
  'Mixed / Other',
];

export function TeamDetailsForm({
  onSubmit,
  defaultValues,
  isLoading = false,
}: TeamDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TeamDetailsFormData>({
    resolver: zodResolver(teamDetailsSchema),
    defaultValues: {
      company: defaultValues?.company || '',
      email: defaultValues?.email || '',
      teamSize: defaultValues?.teamSize || 1,
      primaryUseCase: defaultValues?.primaryUseCase || '',
    },
  });

  const teamSize = watch('teamSize');

  return (
    <Card className="p-8 border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <Input
            type="text"
            placeholder="Acme Inc"
            {...register('company')}
            disabled={isLoading}
            className={errors.company ? 'border-red-500' : ''}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="you@company.com"
            {...register('email')}
            disabled={isLoading}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Size
          </label>
          <Input
            type="number"
            min="1"
            placeholder="1"
            {...register('teamSize', { valueAsNumber: true })}
            disabled={isLoading}
            className={errors.teamSize ? 'border-red-500' : ''}
          />
          <p className="mt-1 text-xs text-gray-500">
            Current value: {teamSize} person{teamSize !== 1 ? 's' : ''}
          </p>
          {errors.teamSize && (
            <p className="mt-1 text-sm text-red-500">{errors.teamSize.message}</p>
          )}
        </div>

        {/* Primary Use Case */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Primary Use Case
          </label>
          <div className="grid grid-cols-2 gap-2">
            {USE_CASES.map((useCase) => (
              <label
                key={useCase}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <input
                  type="radio"
                  value={useCase}
                  {...register('primaryUseCase')}
                  disabled={isLoading}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">{useCase}</span>
              </label>
            ))}
          </div>
          {errors.primaryUseCase && (
            <p className="mt-2 text-sm text-red-500">
              {errors.primaryUseCase.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Generating Audit...' : 'Generate Audit Report'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
