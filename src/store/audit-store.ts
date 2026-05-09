import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserToolInput {
  id: string;
  toolId: string;
  planId: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditStore {
  // State
  tools: UserToolInput[];
  teamSize: number;
  primaryUseCase: string;
  email: string;
  company: string;

  // Actions
  addTool: (tool: UserToolInput) => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updates: Partial<UserToolInput>) => void;
  setTeamSize: (size: number) => void;
  setPrimaryUseCase: (useCase: string) => void;
  setEmail: (email: string) => void;
  setCompany: (company: string) => void;
  reset: () => void;
}

const initialState = {
  tools: [],
  teamSize: 1,
  primaryUseCase: '',
  email: '',
  company: '',
};

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      ...initialState,

      addTool: (tool) =>
        set((state) => ({
          tools: [...state.tools, tool],
        })),

      removeTool: (id) =>
        set((state) => ({
          tools: state.tools.filter((t) => t.id !== id),
        })),

      updateTool: (id, updates) =>
        set((state) => ({
          tools: state.tools.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      setTeamSize: (size) =>
        set({
          teamSize: size,
        }),

      setPrimaryUseCase: (useCase) =>
        set({
          primaryUseCase: useCase,
        }),

      setEmail: (email) =>
        set({
          email,
        }),

      setCompany: (company) =>
        set({
          company,
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'audit-store',
      skipHydration: true,
    }
  )
);
