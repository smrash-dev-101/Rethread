import { useState } from 'react'
import { Copy, Check, Lock } from 'lucide-react'
import { PLATFORMS } from '../utils/platforms'

const WATERMARK = '\n\n— Made with ReThread.ai (Free Plan) · rethread.ai'

export default function OutputCard({ platformId, content, isLocked = false, index = 0 }) {
  const [copied, setCopied] = useState(false)
  const p = PLATFORMS[platformId]
  if (!p || !content) return null

  const displayText = content
  const copyText = isLocked ? '' : (content + WATERMARK)

  async function handleCopy() {
    if (isLocked) return
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const el = document.createElement('textarea')
      el.value = copyText
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length

  return (
    <div
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        animation: 'fadeIn 0.35s ease forwards',
        animationDelay: `${index * 0.06}s`,
        opacity: 0,
        position: 'relative',
        transition: 'border-color var(--transition)',
      }}
      onMouseEnter={e => {
        if (!isLocked) e.currentTarget.style.borderColor = 'var(--border-default)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
      }}
    >
      {/* Card header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-elevated)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30,
            borderRadius: 8,
            background: p.colorDim,
            border: `1px solid ${p.color}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            color: p.color,
            fontWeight: 700,
            flexShrink: 0,
          }}>{p.icon}</div>

          <div>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>{p.label}</div>
            <div style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}>{wordCount} words</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isLocked && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              background: 'var(--accent-dim)',
              border: '1px solid rgba(124,106,247,0.2)',
              padding: '4px 10px',
              borderRadius: 99,
            }}>
              <Lock size={10} />
              Upgrade to unlock
            </div>
          )}

          {!isLocked && (
            <button
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                borderRadius: 'var(--radius-sm)',
                background: copied ? 'rgba(74,222,128,0.1)' : 'var(--bg-hover)',
                border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'var(--border-default)'}`,
                color: copied ? 'var(--green)' : 'var(--text-secondary)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--transition)',
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {/* Content area */}
      <div style={{ position: 'relative' }}>
        <div style={{
          padding: '16px',
          fontSize: 13.5,
          lineHeight: 1.75,
          color: isLocked ? 'var(--text-disabled)' : 'var(--text-secondary)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: isLocked ? 120 : 400,
          overflow: 'hidden',
          filter: isLocked ? 'blur(4px)' : 'none',
          userSelect: isLocked ? 'none' : 'auto',
          transition: 'filter var(--transition)',
        }}>
          {displayText}
        </div>

        {/* Watermark tag for free tier */}
        {!isLocked && (
          <div style={{
            padding: '0 16px 12px',
            fontSize: 11,
            color: 'var(--text-disabled)',
            fontFamily: 'var(--font-mono)',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 8,
          }}>
            ✦ Watermark added on copy · Upgrade to remove
          </div>
        )}

        {/* Locked overlay */}
        {isLocked && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 20%, var(--bg-tertiary) 70%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '0 16px 16px',
          }}>
            <div style={{
              width: '100%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                  Unlock this output
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Creator plan · $19/month · Unlimited repurposings
                </div>
              </div>
              <button style={{
                padding: '8px 16px',
                background: 'var(--accent)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all var(--transition)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-bright)'
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--accent)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              >
                Upgrade — $19/mo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
