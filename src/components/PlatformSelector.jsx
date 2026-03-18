import { PLATFORMS, PLATFORM_ORDER } from '../utils/platforms'

export default function PlatformSelector({ selected, onChange }) {
  const toggle = (id) => {
    if (selected.includes(id)) {
      if (selected.length <= 2) return // minimum 2
      onChange(selected.filter(p => p !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div>
      <div style={{
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 10,
      }}>Output Platforms
        <span style={{ color: 'var(--text-disabled)', marginLeft: 6 }}>
          ({selected.length} selected · min 2)
        </span>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 7,
      }}>
        {PLATFORM_ORDER.map(id => {
          const p = PLATFORMS[id]
          const isActive = selected.includes(id)

          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 'var(--radius-xl)',
                border: `1px solid ${isActive ? p.color + '66' : 'var(--border-subtle)'}`,
                background: isActive ? p.colorDim : 'transparent',
                color: isActive ? p.color : 'var(--text-muted)',
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                transition: 'all var(--transition)',
                userSelect: 'none',
              }}
            >
              <span style={{ fontSize: 13, lineHeight: 1 }}>{p.icon}</span>
              <span>{p.label}</span>
              {isActive && (
                <span style={{
                  width: 5, height: 5,
                  borderRadius: '50%',
                  background: p.color,
                  display: 'block',
                  flexShrink: 0,
                }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
