// Client-side configuration for Raksha's portfolio
// NOTE: NO API KEYS HERE! API key is ONLY in serverless function (/api/chat.ts)

export const AI_CONFIG = {
  // AI is always enabled for users
  ENABLED: true,
  
  // Model settings (sent to API route, not used directly)
  MODEL: 'gpt-4o-mini',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  
  // API endpoint (secure serverless function)
  API_ENDPOINT: '/api/chat'
};
