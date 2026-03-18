const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

export async function callClaude(prompt) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    throw new Error('API_KEY_MISSING')
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    if (response.status === 401) throw new Error('INVALID_API_KEY')
    if (response.status === 429) throw new Error('RATE_LIMITED')
    if (response.status === 529) throw new Error('API_OVERLOADED')
    throw new Error(err.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  const raw = data.content?.map(b => b.text || '').join('') || ''

  // Parse JSON from response
  try {
    const clean = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
    return JSON.parse(clean)
  } catch {
    // Try to extract JSON object
    const match = raw.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error('PARSE_ERROR')
  }
}

export const API_ERRORS = {
  API_KEY_MISSING: 'No API key found. Add VITE_ANTHROPIC_API_KEY to your .env.local file.',
  INVALID_API_KEY: 'Invalid API key. Check your Anthropic API key.',
  RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
  API_OVERLOADED: 'Claude is experiencing high demand. Try again in a few seconds.',
  PARSE_ERROR: 'Unexpected response format. Please try again.',
}
