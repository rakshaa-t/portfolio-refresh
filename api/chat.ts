import type { VercelRequest, VercelResponse } from '@vercel/node';

// Serverless function to handle OpenAI chat completions
// This keeps the API key secure on the server side
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'gpt-4o-mini', max_tokens = 500, temperature = 0.7 } = req.body;

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Get API key from environment
    const apiKey = process.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ API Key not found in environment');
      return res.status(500).json({ error: 'API configuration error' });
    }

    console.log('✅ Calling OpenAI API from serverless function...');

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens,
        temperature,
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ OpenAI API error:', response.status, errorData);
      
      return res.status(response.status).json({
        error: 'OpenAI API error',
        details: errorData,
      });
    }

    // Parse and return successful response
    const data = await response.json();
    console.log('✅ OpenAI API response received');
    
    return res.status(200).json(data);

  } catch (error: any) {
    console.error('❌ Server error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}

