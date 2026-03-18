import { NavLink } from 'react-router-dom'
import { LayoutDashboard, History, Settings, Zap, ChevronRight } from 'lucide-react'
import { useUsage } from '../hooks/useUsage'

const NAV_ITEMS = [
  { to: '/',         icon: LayoutDashboard, label: 'Repurpose'  },
  { to: '/history',  icon: History,         label: 'History'    },
  { to: '/settings', icon: Settings,        label: 'Settings'   },
]

export default function Sidebar() {
  const { count, freeLimit, remaining, isAtLimit } = useUsage()
  const usedPercent = Math.min((count / freeLimit) * 100, 100)

  return (
    <aside style={{
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      width: 'var(--sidebar-width)',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28,
            background: 'var(--accent)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}>R</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '-0.3px',
            color: 'var(--text-primary)',
          }}>ReThread</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 4 }}>
          <div style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '6px 12px',
            marginBottom: 4,
          }}>Menu</div>

          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-elevated)' : 'transparent',
                fontWeight: isActive ? 500 : 400,
                fontSize: 14,
                transition: 'all var(--transition)',
                marginBottom: 2,
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {isActive && (
                    <div style={{
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                    }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom — usage + upgrade */}
      <div style={{ padding: '12px 12px 16px' }}>
        {/* Usage meter */}
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          marginBottom: 8,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}>
            <span style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}>Free uses today</span>
            <span style={{
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: isAtLimit ? 'var(--red)' : 'var(--text-primary)',
              fontWeight: 600,
            }}>{count}/{freeLimit}</span>
          </div>

          {/* Progress bar */}
          <div style={{
            height: 4,
            background: 'var(--border-subtle)',
            borderRadius: 99,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${usedPercent}%`,
              background: isAtLimit
                ? 'var(--red)'
                : `linear-gradient(90deg, var(--accent), var(--accent-bright))`,
              borderRadius: 99,
              transition: 'width 0.4s ease',
            }} />
          </div>

          {!isAtLimit && (
            <div style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginTop: 6,
            }}>{remaining} remaining · resets midnight</div>
          )}
        </div>

        {/* Upgrade button */}
        <button
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(124,106,247,0.25)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--accent-bright)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(124,106,247,0.22)'
            e.currentTarget.style.borderColor = 'rgba(124,106,247,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--accent-dim)'
            e.currentTarget.style.borderColor = 'rgba(124,106,247,0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={14} fill="currentColor" />
            <span>Upgrade Plan</span>
          </div>
          <ChevronRight size={14} />
        </button>
      </div>
    </aside>
  )
}
