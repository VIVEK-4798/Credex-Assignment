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
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    category: 'chat',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPrice: 0,
        seatBased: false,
      },
      {
        id: 'plus',
        name: 'Plus',
        monthlyPrice: 20,
        seatBased: false,
      },
      {
        id: 'team',
        name: 'Team',
        monthlyPrice: 50,
        seatBased: true,
      },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    category: 'chat',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPrice: 0,
        seatBased: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 20,
        seatBased: false,
      },
      {
        id: 'api',
        name: 'API',
        monthlyPrice: 0,
        seatBased: false,
      },
    ],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    vendor: 'GitHub',
    category: 'coding',
    plans: [
      {
        id: 'individual',
        name: 'Individual',
        monthlyPrice: 10,
        seatBased: false,
      },
      {
        id: 'business',
        name: 'Business',
        monthlyPrice: 19,
        seatBased: true,
      },
    ],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    vendor: 'Midjourney',
    category: 'mixed',
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        monthlyPrice: 10,
        seatBased: false,
      },
      {
        id: 'standard',
        name: 'Standard',
        monthlyPrice: 30,
        seatBased: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 60,
        seatBased: false,
      },
    ],
  },
  {
    id: 'runway',
    name: 'Runway',
    vendor: 'Runway Research',
    category: 'mixed',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPrice: 0,
        seatBased: false,
      },
      {
        id: 'standard',
        name: 'Standard',
        monthlyPrice: 12,
        seatBased: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 76,
        seatBased: false,
      },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    vendor: 'Perplexity',
    category: 'research',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPrice: 0,
        seatBased: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 20,
        seatBased: false,
      },
    ],
  },
  {
    id: 'notionai',
    name: 'Notion AI',
    vendor: 'Notion',
    category: 'writing',
    plans: [
      {
        id: 'included',
        name: 'Included in Notion',
        monthlyPrice: 10,
        seatBased: true,
      },
    ],
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    vendor: 'Grammarly',
    category: 'writing',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPrice: 0,
        seatBased: false,
      },
      {
        id: 'premium',
        name: 'Premium',
        monthlyPrice: 12,
        seatBased: false,
      },
      {
        id: 'business',
        name: 'Business',
        monthlyPrice: 15,
        seatBased: true,
      },
    ],
  },
  {
    id: 'descript',
    name: 'Descript',
    vendor: 'Descript',
    category: 'writing',
    plans: [
      {
        id: 'creator-free',
        name: 'Creator Free',
        monthlyPrice: 0,
        seatBased: false,
      },
      {
        id: 'creator',
        name: 'Creator',
        monthlyPrice: 24,
        seatBased: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 60,
        seatBased: true,
      },
    ],
  },
];