// Platform configuration — icons, labels, colors, char limits
export const PLATFORMS = {
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: '💼',
    color: '#0077b5',
    colorDim: 'rgba(0,119,181,0.15)',
    charLimit: 3000,
    hint: '150–250 words · Hook + Story + CTA + Hashtags',
  },
  twitter: {
    id: 'twitter',
    label: 'Twitter / X',
    icon: '✕',
    color: '#e7e9ea',
    colorDim: 'rgba(231,233,234,0.1)',
    charLimit: 280,
    hint: '5-tweet thread · Hook + 3 points + Takeaway',
  },
  tiktok: {
    id: 'tiktok',
    label: 'TikTok Script',
    icon: '♪',
    color: '#fe2c55',
    colorDim: 'rgba(254,44,85,0.15)',
    charLimit: 500,
    hint: '45–60 sec · Hook in 3s + Value + CTA',
  },
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    icon: '◈',
    color: '#e1306c',
    colorDim: 'rgba(225,48,108,0.15)',
    charLimit: 2200,
    hint: '100–150 words · Story + Question + Hashtags',
  },
  newsletter: {
    id: 'newsletter',
    label: 'Newsletter',
    icon: '✉',
    color: '#f7936a',
    colorDim: 'rgba(247,147,106,0.15)',
    charLimit: 800,
    hint: '150–200 words · Personal opener + Intrigue + Bridge',
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    icon: '▶',
    color: '#ff0000',
    colorDim: 'rgba(255,0,0,0.12)',
    charLimit: 5000,
    hint: '200–250 words · SEO hook + Summary + Chapters + CTA',
  },
  threads: {
    id: 'threads',
    label: 'Threads',
    icon: '@',
    color: '#aaaaaa',
    colorDim: 'rgba(170,170,170,0.1)',
    charLimit: 500,
    hint: '80–120 words · Conversational + Opinionated + Question',
  },
}

export const DEFAULT_ACTIVE_PLATFORMS = ['linkedin', 'twitter', 'tiktok', 'instagram', 'newsletter']

export const PLATFORM_ORDER = ['linkedin', 'twitter', 'tiktok', 'instagram', 'newsletter', 'youtube', 'threads']
