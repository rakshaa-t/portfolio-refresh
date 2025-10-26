// Hidden configuration for Raksha's portfolio
// This file contains the API key and settings that users won't see

export const AI_CONFIG = {
  // API key is loaded from environment variable (VITE_OPENAI_API_KEY)
  // See ENV_SETUP.md for configuration instructions
  API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  
  // AI is always enabled for users
  ENABLED: true,
  
  // Model settings
  MODEL: 'gpt-4o-mini',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  
  // Fallback when API fails
  USE_FALLBACK: true
};

// Debug: Log if API key is loaded (first 10 chars only for security)
if (AI_CONFIG.API_KEY) {
  console.log('🔑 API Key loaded:', AI_CONFIG.API_KEY.substring(0, 10) + '...');
  console.log('✅ Chat functionality is ready!');
} else {
  console.error('❌ NO API KEY FOUND!');
  console.error('📖 See ENV_SETUP.md for configuration instructions');
  console.error('🔗 Quick fix: Add VITE_OPENAI_API_KEY to Vercel and redeploy WITHOUT cache');
}

// Instructions for updating the API key:
// 1. Replace 'sk-proj-your-openai-key-here' with your actual API key
// 2. Commit and push the changes
// 3. The website will automatically redeploy with the new key
