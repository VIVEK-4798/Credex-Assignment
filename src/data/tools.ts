// Tools data
import { AITool } from '@/types/tool';

export const AI_TOOLS: AITool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    vendor: 'Cursor',
    category: 'coding',
    plans: [
      {
        id: 'hobby',
        name: 'Hobby',
        monthlyPrice: 0,
        seatBased: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 20,
        seatBased: true,
      },
      {
        id: 'business',
        name: 'Business',
        monthlyPrice: 40,
        seatBased: true,
      },
    ],
  },
];