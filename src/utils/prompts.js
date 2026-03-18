const PLATFORM_INSTRUCTIONS = {
  linkedin: `LINKEDIN_POST:
Write a compelling LinkedIn post (150-250 words).
- First line MUST be a bold, scroll-stopping hook (no "I" opener)
- Short paragraphs, max 2-3 lines each
- Build a mini narrative or share a key insight
- End with a thought-provoking question or clear CTA
- Add 3-5 relevant hashtags on the last line
- Tone: professional but human, not corporate-speak`,

  twitter: `TWITTER_THREAD:
Write a 5-tweet thread. Format exactly like this:
1/ [Hook tweet — max 240 chars, makes people want to read on]
2/ [First key point — concrete and specific]
3/ [Second key point — counterintuitive or surprising]
4/ [Third key point — most actionable]
5/ [Takeaway + CTA — summarize + ask for RT or reply]
Each tweet max 280 characters. Number them exactly as shown.`,

  tiktok: `TIKTOK_SCRIPT:
Write a punchy TikTok video script for a 45-60 second video.
Format with clear labels:
HOOK (0-3 sec): [Scroll-stopping opening line — makes them stop immediately]
SETUP (3-10 sec): [Context — what problem are we solving?]
CONTENT (10-50 sec): [3 quick points or a mini story — fast paced]
CTA (50-60 sec): [Follow/comment/share CTA]
Tone: Conversational, fast, energetic. Write as spoken words.`,

  instagram: `INSTAGRAM_CAPTION:
Write an Instagram caption (100-150 words).
- First line must hook before the "more" fold (under 125 chars)
- Tell a mini story or share a perspective shift
- Use line breaks generously for readability
- End with a question to drive comments
- New paragraph: 8-12 relevant hashtags
Tone: Warm, personal, authentic.`,

  newsletter: `NEWSLETTER_INTRO:
Write an email newsletter intro section (150-200 words).
- Start with a conversational, personal opener (not "Dear reader")
- Build intrigue about what's inside this issue
- Share one quick insight or teaser
- End with a transition sentence that bridges to the main content
- Subject line suggestion on first line: SUBJECT: [subject here]
Tone: Like writing to a friend who trusts your expertise.`,

  youtube: `YOUTUBE_DESCRIPTION:
Write a YouTube video description (200-250 words).
Format:
[2-sentence hook paragraph — SEO-optimized, explains the video]

In this video, you'll learn:
• [Point 1]
• [Point 2]  
• [Point 3]

CHAPTERS:
0:00 Introduction
2:30 [Topic from content]
5:00 [Topic from content]
8:30 [Topic from content]
11:00 Final thoughts

[Subscribe CTA sentence]

TAGS: [10 relevant comma-separated tags]`,

  threads: `THREADS_POST:
Write a Threads post (80-120 words).
- Conversational, casual, opinionated
- Short punchy sentences. One idea per line.
- Take a clear stance or share a genuine hot take
- End with an open question
- NO hashtags
Tone: Like a smart friend texting you something interesting.`,
}

export function buildRepurposePrompt(content, platforms) {
  const instructions = platforms
    .map(p => PLATFORM_INSTRUCTIONS[p])
    .filter(Boolean)
    .join('\n\n---\n\n')

  return `You are an expert social media strategist and copywriter. Your job is to repurpose the content below into platform-native formats that feel authentic and drive engagement.

ORIGINAL CONTENT:
"""
${content.substring(0, 4000)}
"""

TASK: Generate content for each platform below. Follow the instructions exactly.

${instructions}

CRITICAL OUTPUT RULES:
- Return ONLY a valid JSON object
- No markdown code blocks, no backticks, no explanation text
- Keys must exactly match: ${platforms.join(', ')}
- Values are the generated content as plain strings
- Preserve line breaks using \\n in the JSON strings

Example format:
{"linkedin": "First line hook...\\n\\nSecond paragraph...", "twitter": "1/ Hook tweet...\\n2/ Point one..."}

Generate now:`
}
