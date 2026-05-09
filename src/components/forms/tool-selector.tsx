'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AI_TOOLS } from '@/data/tools';
import { UserToolInput } from '@/store/audit-store';

interface ToolSelectorProps {
  onAddTool: (tool: UserToolInput) => void;
  existingTools: UserToolInput[];
}

export function ToolSelector({ onAddTool, existingTools }: ToolSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [monthlySpend, setMonthlySpend] = useState('');
  const [seats, setSeats] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const existingToolIds = new Set(existingTools.map((t) => t.toolId));

  const filteredTools = AI_TOOLS.filter(
    (tool) =>
      !existingToolIds.has(tool.id) &&
      (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentTool = AI_TOOLS.find((t) => t.id === selectedTool);
  const currentPlan = currentTool?.plans.find((p) => p.id === selectedPlan);

  const handleAddTool = () => {
    if (!selectedTool || !selectedPlan || !monthlySpend) return;

    const newTool: UserToolInput = {
      id: Math.random().toString(36),
      toolId: selectedTool,
      planId: selectedPlan,
      monthlySpend: parseFloat(monthlySpend),
      seats: currentTool?.plans.find(p => p.id === selectedPlan)?.seatBased ? parseInt(seats) : 1,
    };

    onAddTool(newTool);

    // Reset form
    setSelectedTool(null);
    setSelectedPlan(null);
    setMonthlySpend('');
    setSeats('1');
    setSearchQuery('');
    setIsOpen(false);
  };

  const isFormComplete =
    selectedTool && selectedPlan && monthlySpend && (!currentPlan?.seatBased || seats);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full gap-2 border-dashed border-2"
      >
        <Plus className="w-5 h-5" />
        Add Tool
      </Button>
    );
  }

  return (
    <Card className="p-6 border-gray-200 space-y-6">
      {/* Tool Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Tool <span className="text-gray-400">*</span>
        </label>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setSelectedTool(tool.id);
                  setSelectedPlan(null);
                }}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  selectedTool === tool.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{tool.name}</p>
                    <p className="text-sm text-gray-600">{tool.vendor}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">
                {searchQuery
                  ? 'No tools found. Try a different search.'
                  : 'All tools already added. Great job! 🎉'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Plan Selection */}
      {currentTool && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Plan
          </label>
          <div className="grid grid-cols-1 gap-2">
            {currentTool.plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{plan.name}</p>
                    <p className="text-sm text-gray-600">
                      ${plan.monthlyPrice}/month
                      {plan.seatBased && ' per seat'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Spend Input */}
      {currentPlan && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Spend (USD) <span className="text-gray-400">*</span>
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g., 29"
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            How much does your team spend monthly on this tool?
          </p>
        </div>
      )}

      {/* Seats Input (if needed) */}
      {currentPlan?.seatBased && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Seats <span className="text-gray-400">*</span>
          </label>
          <Input
            type="number"
            min="1"
            placeholder="e.g., 5"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            How many people actively use this tool?
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleAddTool}
          disabled={!isFormComplete}
          className="flex-1"
        >
          Add Tool
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            setSelectedTool(null);
            setSelectedPlan(null);
            setMonthlySpend('');
            setSeats('1');
            setSearchQuery('');
          }}
          variant="outline"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
}
