# ReThread — AI Content Repurposing Engine

> Turn one piece of content into posts for every platform in 60 seconds.

![ReThread](https://img.shields.io/badge/ReThread-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF)

---

## What It Does

ReThread takes your long-form content — blog posts, podcast transcripts, YouTube scripts, articles — and uses Claude AI to instantly generate platform-native content for:

- 💼 LinkedIn Posts
- 𝕏 Twitter/X Threads
- 🎵 TikTok Scripts
- 📸 Instagram Captions
- 📧 Newsletter Intros
- ▶ YouTube Descriptions
- 🧵 Threads Posts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| AI Engine | Anthropic Claude API |
| Icons | Lucide React |
| Payments | Stripe (Phase 2) |
| Auth | Supabase (Phase 2) |
| Hosting | Vercel |

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/rethread.git
cd rethread
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your Anthropic API key:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
```

---

## Deploying to Vercel

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add `VITE_ANTHROPIC_API_KEY` in Vercel Environment Variables
4. Deploy

---

## Project Structure

```
rethread/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── PlatformSelector.jsx
│   │   ├── OutputCard.jsx
│   │   ├── UpgradeModal.jsx
│   │   └── LoadingState.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx  # Main repurposing tool
│   │   ├── History.jsx    # Past repurposings
│   │   └── Settings.jsx   # User settings
│   ├── hooks/
│   │   ├── useRepurpose.js  # Core AI logic
│   │   └── useUsage.js      # Free tier tracking
│   ├── utils/
│   │   ├── anthropic.js     # Claude API client
│   │   ├── platforms.js     # Platform configs
│   │   └── prompts.js       # AI prompt templates
│   ├── styles/
│   │   └── globals.css      # Global styles + CSS variables
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Pricing Model

| Plan | Price | Repurposings |
|------|-------|--------------|
| Free | $0/mo | 3/day with watermark |
| Starter | $9/mo | 30/month |
| Creator | $19/mo | Unlimited |

---

## Roadmap

- [x] Core text repurposing engine
- [x] 7 platform support
- [x] Freemium gating + watermark
- [ ] YouTube URL → auto-transcribe
- [ ] User authentication
- [ ] Saved history
- [ ] Stripe payments
- [ ] Social media scheduler
- [ ] Video clip extraction

---

## License

MIT
