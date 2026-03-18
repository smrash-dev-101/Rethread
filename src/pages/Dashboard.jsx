import { useState } from 'react'
import { Sparkles, RotateCcw, AlertCircle, ArrowRight, FileText, Youtube } from 'lucide-react'
import PlatformSelector from '../components/PlatformSelector'
import OutputCard from '../components/OutputCard'
import LoadingState from '../components/LoadingState'
import { useRepurpose } from '../hooks/useRepurpose'
import { useUsage } from '../hooks/useUsage'
import { DEFAULT_ACTIVE_PLATFORMS } from '../utils/platforms'

const EXAMPLE_CONTENT = `Last week I made a mistake that cost me 3 hours of work.

I was so focused on shipping a new feature that I skipped writing tests. "I'll add them later," I told myself. We all know how that story ends.

Later never came. The feature shipped, users found edge cases I hadn't considered, and I spent the next day debugging code I'd already moved on from mentally.

The lesson? Shortcuts in your process always compound. One skipped test becomes ten. Ten becomes a codebase nobody wants to touch. The technical debt wasn't the real cost — the real cost was the mental tax of knowing the foundation was shaky.

Ship fast, but ship with intention. The extra 20 minutes you spend now is worth the 3 hours you won't spend debugging next week.`

export default function Dashboard() {
  const [content, setContent] = useState('')
  const [activePlatforms, setActivePlatforms] = useState(DEFAULT_ACTIVE_PLATFORMS)
  const { status, results, error, loadingMessage, repurpose, reset, isLoading, isSuccess } = useRepurpose()
  const { count, freeLimit, canUse, isAtLimit, increment } = useUsage()

  const charCount = content.length
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const canGenerate = content.trim().length >= 80 && canUse && !isLoading

  async function handleGenerate() {
    if (!canGenerate) return
    increment()
    await repurpose(content, activePlatforms)
  }

  function handleReset() {
    reset()
    setContent('')
  }

  const totalWords = results
    ? Object.values(results).reduce((acc, v) => acc + (v?.split(/\s+/).length || 0), 0)
    : 0
  const timeSaved = activePlatforms.length * 14

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>

      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22, fontWeight: 800, letterSpacing: '-0.4px',
              color: 'var(--text-primary)', marginBottom: 4,
            }}>Repurpose Content</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Paste your content — blog post, transcript, script, or any long-form text.
            </p>
          </div>
          {isSuccess && (
            <button onClick={handleReset} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              transition: 'all var(--transition)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-strong)'; e.currentTarget.style.color='var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-default)'; e.currentTarget.style.color='var(--text-secondary)' }}
            >
              <RotateCcw size={13} /> New Content
            </button>
          )}
        </div>
      </div>

      {/* Limit warning */}
      {isAtLimit && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px',
          background: 'rgba(248,113,113,0.08)',
          border: '1px solid rgba(248,113,113,0.2)',
          borderRadius: 'var(--radius-md)', marginBottom: 20,
          fontSize: 13, color: 'var(--red)',
        }}>
          <AlertCircle size={14} />
          <span>You've used all <strong>{freeLimit} free repurposings</strong> for today. Resets at midnight — or upgrade.</span>
          <button style={{
            marginLeft: 'auto', padding: '5px 12px',
            background: 'var(--accent)', borderRadius: 'var(--radius-sm)',
            color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>Upgrade</button>
        </div>
      )}

      {/* INPUT */}
      {!isSuccess && !isLoading && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden', marginBottom: 16,
            transition: 'border-color var(--transition)',
          }}
          onFocusCapture={e => e.currentTarget.style.borderColor='rgba(124,106,247,0.35)'}
          onBlurCapture={e => e.currentTarget.style.borderColor='var(--border-subtle)'}
          >
            {/* Toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '10px 14px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-elevated)', gap: 8,
            }}>
              <FileText size={14} color="var(--text-muted)" />
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flex: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Your Content
              </span>
              <button onClick={() => { setContent(EXAMPLE_CONTENT); reset() }} style={{
                fontSize: 11, color: 'var(--accent)',
                background: 'var(--accent-dim)',
                border: '1px solid rgba(124,106,247,0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px 10px', cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'all var(--transition)',
              }}>Try example</button>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: charCount > 6000 ? 'var(--yellow)' : 'var(--text-disabled)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{wordCount}w</span>
                {' · '}{charCount}/8000
              </div>
            </div>

            <textarea
              value={content}
              onChange={e => setContent(e.target.value.slice(0, 8000))}
              placeholder={"Paste your blog post, podcast transcript, YouTube script, or any long-form content here...\n\nTip: Works best with 200+ words. The more context, the better the outputs."}
              style={{
                width: '100%', minHeight: 220,
                padding: '16px', fontSize: 14, lineHeight: 1.75,
                color: 'var(--text-primary)', background: 'transparent',
                border: 'none', outline: 'none', resize: 'vertical',
                fontFamily: 'var(--font-body)',
              }}
            />

            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Youtube size={14} color="var(--text-muted)" />
              <input placeholder="YouTube URL auto-transcription — coming soon" disabled
                style={{ flex: 1, fontSize: 12, color: 'var(--text-disabled)', background: 'transparent', border: 'none', outline: 'none', cursor: 'not-allowed' }} />
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-disabled)', background: 'var(--bg-hover)', padding: '2px 8px', borderRadius: 4 }}>Soon</span>
            </div>
          </div>

          {/* Platform selector */}
          <div style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px', marginBottom: 16,
          }}>
            <PlatformSelector selected={activePlatforms} onChange={setActivePlatforms} />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '12px 16px',
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.2)',
              borderRadius: 'var(--radius-md)', marginBottom: 16,
              fontSize: 13, color: 'var(--red)',
            }}>
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '15px 24px',
              background: canGenerate ? 'linear-gradient(135deg, var(--accent), #5a50e8)' : 'var(--bg-elevated)',
              border: `1px solid ${canGenerate ? 'transparent' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-lg)',
              color: canGenerate ? '#fff' : 'var(--text-disabled)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.2px',
              cursor: canGenerate ? 'pointer' : 'not-allowed',
              transition: 'all var(--transition)',
              boxShadow: canGenerate ? '0 4px 20px rgba(124,106,247,0.35)' : 'none',
            }}
            onMouseEnter={e => { if(canGenerate){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(124,106,247,0.45)' }}}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=canGenerate?'0 4px 20px rgba(124,106,247,0.35)':'none' }}
          >
            <Sparkles size={18} />
            Repurpose with AI
            <span style={{ fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 400, opacity: 0.75 }}>
              · {count}/{freeLimit} free uses today
            </span>
            <ArrowRight size={16} />
          </button>

          {content.trim().length > 0 && content.trim().length < 80 && (
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
              Add {80 - content.trim().length} more characters to enable
            </p>
          )}
        </div>
      )}

      {/* LOADING */}
      {isLoading && <LoadingState message={loadingMessage} />}

      {/* RESULTS */}
      {isSuccess && results && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Platforms', value: activePlatforms.length },
              { label: 'Words Generated', value: totalWords },
              { label: 'Mins Saved', value: `~${timeSaved}` },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent-bright)', lineHeight: 1, marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            {activePlatforms.map((platformId, idx) => (
              <OutputCard
                key={platformId}
                platformId={platformId}
                content={results[platformId] || ''}
                isLocked={idx >= 2}
                index={idx}
              />
            ))}
          </div>

          {activePlatforms.length > 2 && (
            <div style={{
              marginTop: 20, padding: '20px 24px',
              background: 'linear-gradient(135deg, var(--accent-dim), var(--accent2-dim))',
              border: '1px solid rgba(124,106,247,0.2)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 16, flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
                  Unlock {activePlatforms.length - 2} locked outputs
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Creator plan · <strong style={{ color: 'var(--text-primary)' }}>$19/month</strong> · Unlimited repurposings · No watermarks
                </div>
              </div>
              <button style={{
                padding: '11px 24px', background: 'var(--accent)',
                borderRadius: 'var(--radius-md)', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-display)', whiteSpace: 'nowrap',
                transition: 'all var(--transition)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent-bright)'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.transform='translateY(0)' }}
              >
                Upgrade Now — $19/mo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
