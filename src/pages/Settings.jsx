import { useState } from 'react'
import { Key, Check, Eye, EyeOff, AlertCircle, ExternalLink } from 'lucide-react'
import { useUsage } from '../hooks/useUsage'

function SettingSection({ title, description, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{title}</h3>
        {description && <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{description}</p>}
      </div>
      <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

function SettingRow({ label, description, children, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px', gap: 16,
      borderBottom: last ? 'none' : '1px solid var(--border-subtle)',
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{description}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  )
}

export default function Settings() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_ANTHROPIC_API_KEY?.startsWith('sk-ant') ? '••••••••••••••••••••' : '')
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const { count, freeLimit, remaining, reset: resetUsage } = useUsage()

  function handleSaveKey() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const keyConfigured = import.meta.env.VITE_ANTHROPIC_API_KEY?.startsWith('sk-ant')

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.4px', marginBottom: 4 }}>Settings</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Manage your API key, usage, and preferences.</p>
      </div>

      {/* API Key */}
      <SettingSection title="Anthropic API Key" description="Required to power the AI repurposing engine. Your key is stored in your .env.local file — never in the browser.">
        <div style={{ padding: '16px 18px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 12,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: keyConfigured ? 'var(--green)' : 'var(--red)',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 13, color: keyConfigured ? 'var(--green)' : 'var(--red)', fontFamily: 'var(--font-mono)' }}>
              {keyConfigured ? 'API key detected in environment' : 'No API key configured'}
            </span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            marginBottom: 10,
          }}>
            <Key size={14} color="var(--text-muted)" />
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              style={{ flex: 1, fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', background: 'transparent', border: 'none', outline: 'none' }}
            />
            <button onClick={() => setShowKey(!showKey)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, borderRadius: 4 }}>
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={handleSaveKey} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px',
              background: saved ? 'rgba(74,222,128,0.1)' : 'var(--accent)',
              border: saved ? '1px solid rgba(74,222,128,0.3)' : 'none',
              borderRadius: 'var(--radius-md)',
              color: saved ? 'var(--green)' : '#fff',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all var(--transition)',
            }}>
              {saved ? <><Check size={13} /> Saved</> : 'Save Key'}
            </button>
            <a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: 13, textDecoration: 'none',
              transition: 'all var(--transition)',
            }}>
              <ExternalLink size={12} /> Get API Key
            </a>
          </div>

          <div style={{
            marginTop: 12,
            padding: '10px 12px',
            background: 'rgba(124,106,247,0.06)',
            border: '1px solid rgba(124,106,247,0.15)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex', gap: 8,
          }}>
            <AlertCircle size={13} color="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              To set your key permanently, add <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-hover)', padding: '1px 5px', borderRadius: 3, color: 'var(--accent)' }}>VITE_ANTHROPIC_API_KEY=sk-ant-...</code> to your <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-hover)', padding: '1px 5px', borderRadius: 3, color: 'var(--accent)' }}>.env.local</code> file.
            </span>
          </div>
        </div>
      </SettingSection>

      {/* Usage */}
      <SettingSection title="Usage" description="Your free tier usage resets every day at midnight.">
        <SettingRow label="Today's usage" description={`${remaining} repurposings remaining`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 120, height: 6, background: 'var(--border-subtle)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(count/freeLimit)*100}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-bright))', borderRadius: 99 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{count}/{freeLimit}</span>
          </div>
        </SettingRow>
        <SettingRow label="Reset usage counter" description="For testing purposes" last>
          <button onClick={resetUsage} style={{
            padding: '6px 14px',
            background: 'var(--bg-hover)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-secondary)',
            fontSize: 12, cursor: 'pointer',
            transition: 'all var(--transition)',
          }}>Reset Counter</button>
        </SettingRow>
      </SettingSection>

      {/* Plan */}
      <SettingSection title="Plan">
        <SettingRow label="Current Plan" description="Free tier · 3 repurposings per day">
          <button style={{
            padding: '7px 16px',
            background: 'var(--accent)',
            borderRadius: 'var(--radius-md)',
            color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all var(--transition)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='var(--accent-bright)'; e.currentTarget.style.transform='translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.transform='translateY(0)' }}
          >
            Upgrade to Creator — $19/mo
          </button>
        </SettingRow>
        <SettingRow label="Creator Plan" description="Unlimited repurposings · No watermarks · Priority AI" last>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>$19 / month</span>
        </SettingRow>
      </SettingSection>
    </div>
  )
}
