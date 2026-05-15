import { Link } from 'react-router-dom';
import { SUBJECTS } from '../data/subjects';

export default function HubPage() {
  return (
    <div style={{
      height: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      overflowY: 'auto',
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(88,166,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 960, margin: '0 auto', width: '100%', padding: '40px 16px 40px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="hub-emoji" style={{
            fontSize: 72,
            marginBottom: 20,
            animation: 'float 5s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 20px rgba(245,158,11,0.3))',
          }}>
            🎓
          </div>
          <h1 className="hub-title" style={{
            fontSize: 52,
            fontWeight: 900,
            color: 'var(--text)',
            letterSpacing: '-2px',
            marginBottom: 12,
            lineHeight: 1.1,
          }}>
            Study Hub
          </h1>
          <p className="hub-subtitle" style={{
            fontSize: 18,
            color: 'var(--muted)',
            maxWidth: 500,
            margin: '0 auto 24px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            Your exam prep companion. Pick a subject to start mastering the material.
          </p>
          <div className="hub-search-hint" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            color: 'var(--muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ opacity: 0.6 }}>⌘</span>
              <span>Ctrl + K to search</span>
            </div>
            <div style={{ width: 1, height: 12, background: 'var(--border)' }} />
            <button 
              onClick={() => {
                sessionStorage.removeItem('orbit_session');
                window.location.reload();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: 0,
                fontSize: 11,
                fontWeight: 600,
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              🔒 LOCK SESSION
            </button>
          </div>
        </header>

        {/* Subject Cards Grid */}
        <div className="hub-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {SUBJECTS.map((subject, index) => (
            <SubjectCard key={subject.id} subject={subject} index={index} />
          ))}
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          marginTop: 64,
          paddingBottom: 32,
          color: 'var(--muted)',
          fontSize: 13,
          fontFamily: 'var(--font-mono)',
        }}>
          <div style={{ marginBottom: 8, opacity: 0.5 }}>─── ✦ ───</div>
          <span>Built for exam prep • </span>
          <span style={{ color: 'var(--gold)' }}>Study Hub v1.0</span>
        </footer>
      </div>
    </div>
  );
}

function SubjectCard({ subject, index }) {
  const isAvailable = subject.available;

  const cardContent = (
    <div
      style={{
        background: subject.gradient,
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        cursor: isAvailable ? 'pointer' : 'default',
        opacity: isAvailable ? 1 : 0.7,
        minHeight: 180,
        animation: `slideUp 0.5s ease-out ${index * 0.08}s both`,
      }}
      onMouseEnter={(e) => {
        if (!isAvailable) return;
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
        e.currentTarget.style.borderColor = subject.accentColor;
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${subject.accentColor}44, 0 0 60px ${subject.glowColor}`;
      }}
      onMouseLeave={(e) => {
        if (!isAvailable) return;
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      {/* Large background emoji */}
      <div style={{
        position: 'absolute',
        top: -10,
        right: -10,
        fontSize: 100,
        opacity: 0.06,
        pointerEvents: 'none',
        transform: 'rotate(-15deg)',
      }}>
        {subject.emoji}
      </div>

      {/* Top row: emoji + badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 36 }}>{subject.emoji}</span>
        {isAvailable ? (
          <span style={{
            background: `${subject.accentColor}18`,
            color: subject.accentColor,
            border: `1px solid ${subject.accentColor}33`,
            padding: '3px 10px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            letterSpacing: 0.5,
          }}>
            {subject.unitCount} UNITS
          </span>
        ) : (
          <span style={{
            background: 'var(--surface)',
            color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '3px 10px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            letterSpacing: 0.5,
          }}>
            🔒 COMING SOON
          </span>
        )}
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: 22,
        fontWeight: 800,
        marginBottom: 10,
        lineHeight: 1.25,
        color: isAvailable ? 'var(--text)' : 'var(--muted)',
        letterSpacing: '-0.5px',
      }}>
        {subject.title}
      </h2>

      {/* Description */}
      <p style={{
        color: isAvailable ? 'var(--text-secondary)' : 'var(--muted)',
        fontSize: 14,
        lineHeight: 1.6,
        fontFamily: 'var(--font-mono)',
        flex: 1,
        opacity: isAvailable ? 0.9 : 0.6,
      }}>
        {subject.description}
      </p>

      {/* CTA */}
      {isAvailable && (
        <div style={{
          marginTop: 20,
          display: 'inline-flex',
          alignItems: 'center',
          color: subject.accentColor,
          fontWeight: 600,
          fontSize: 14,
          gap: 8,
        }}>
          Start studying <span style={{ fontSize: 18, transition: 'transform 0.2s' }}>→</span>
        </div>
      )}

      {/* Coming soon overlay line */}
      {!isAvailable && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${subject.accentColor}44, transparent)`,
        }} />
      )}
    </div>
  );

  if (isAvailable) {
    return (
      <Link to={`/${subject.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
