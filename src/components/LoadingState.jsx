export default function LoadingState({ message }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 40px',
      animation: 'fadeIn 0.3s ease',
    }}>
      {/* Animated orb */}
      <div style={{ position: 'relative', marginBottom: 32 }}>
        <div style={{
          width: 72, height: 72,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, var(--accent), var(--accent2), var(--accent))',
          animation: 'spin 1.4s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: 4,
          borderRadius: '50%',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}>✦</div>
      </div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 20,
        color: 'var(--text-primary)',
        marginBottom: 10,
        letterSpacing: '-0.3px',
      }}>AI is repurposing...</div>

      <div style={{
        fontSize: 13,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        marginBottom: 28,
        minHeight: 20,
      }}>{message}</div>

      {/* Progress bar */}
      <div style={{
        width: 240,
        height: 3,
        background: 'var(--border-subtle)',
        borderRadius: 99,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, var(--accent), var(--accent2), var(--accent))`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.8s ease infinite',
          borderRadius: 99,
          width: '60%',
        }} />
      </div>

      <div style={{
        marginTop: 20,
        fontSize: 12,
        color: 'var(--text-disabled)',
      }}>Usually takes 10–20 seconds</div>
    </div>
  )
}
