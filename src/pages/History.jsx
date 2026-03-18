import { useState, useEffect } from 'react'
import { Clock, Trash2, Copy, Check, FileText } from 'lucide-react'
import { PLATFORMS } from '../utils/platforms'

export default function History() {
  const [entries, setEntries] = useState([])
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('rt_history')
      if (raw) setEntries(JSON.parse(raw))
    } catch {}
  }, [])

  function clearHistory() {
    localStorage.removeItem('rt_history')
    setEntries([])
  }

  async function copyEntry(text, id) {
    await navigator.clipboard.writeText(text).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (entries.length === 0) {
    return (
      <div style={{ maxWidth: 680, margin: '60px auto', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>
          <Clock size={22} color="var(--text-muted)" />
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No history yet</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Your repurposed content will appear here after your first generation.<br />
          History is stored locally in your browser.
        </p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.4px', marginBottom: 4 }}>History</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{entries.length} saved repurposings · stored locally</p>
        </div>
        <button onClick={clearHistory} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 14px',
          background: 'rgba(248,113,113,0.08)',
          border: '1px solid rgba(248,113,113,0.15)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--red)', fontSize: 13, cursor: 'pointer',
          transition: 'all var(--transition)',
        }}>
          <Trash2 size={13} /> Clear All
        </button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {entries.map((entry, i) => (
          <div key={i} style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileText size={14} color="var(--text-muted)" />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {entry.preview || 'Content repurposing'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{entry.date}</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {Object.keys(entry.results || {}).map(pid => {
                const p = PLATFORMS[pid]
                if (!p) return null
                return (
                  <button key={pid} onClick={() => copyEntry(entry.results[pid], `${i}-${pid}`)} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px',
                    background: copiedId === `${i}-${pid}` ? 'rgba(74,222,128,0.1)' : p.colorDim,
                    border: `1px solid ${copiedId === `${i}-${pid}` ? 'rgba(74,222,128,0.3)' : p.color + '44'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: copiedId === `${i}-${pid}` ? 'var(--green)' : p.color,
                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    transition: 'all var(--transition)',
                  }}>
                    {copiedId === `${i}-${pid}` ? <Check size={11} /> : <Copy size={11} />}
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
