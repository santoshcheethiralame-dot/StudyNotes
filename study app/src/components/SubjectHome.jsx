import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { SUBJECTS } from '../data/subjects';

// Dynamic imports for subject unit metadata
const subjectUnitsModules = {
  mpca: () => import('../data/mpca/units.js'),
  os: () => import('../data/os/units.js'),
};

export default function SubjectHome({ onOpenSearch }) {
  const { subjectId } = useParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const [units, setUnits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subject || !subject.available || !subjectUnitsModules[subjectId]) return;
    
    setLoading(true);
    subjectUnitsModules[subjectId]()
      .then(mod => {
        setUnits(mod.UNITS);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load units:", err);
        setLoading(false);
      });
  }, [subjectId, subject]);

  if (!subject || !subject.available) return <Navigate to="/" />;

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gold)',
        fontFamily: 'var(--font-mono)',
        fontSize: 16,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16, animation: 'float 2s ease-in-out infinite' }}>{subject.emoji}</div>
          Loading {subject.shortTitle}...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      fontFamily: 'var(--font-sans)',
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        {/* Breadcrumb nav */}
        <nav className="subject-breadcrumb" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 32,
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
        }}>
          <Link to="/" style={{
            color: 'var(--muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 8,
            transition: 'all 0.2s',
            border: '1px solid transparent',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--surface)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = 'var(--muted)';
            }}
          >
            <span>←</span> Study Hub
          </Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span style={{ color: subject.accentColor, fontWeight: 600 }}>{subject.shortTitle}</span>

          {/* Search button */}
          <button
            onClick={() => onOpenSearch && onOpenSearch(subjectId)}
            style={{
              marginLeft: 'auto',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--muted)',
              padding: '6px 14px',
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--muted)';
            }}
          >
            🔍 <span className="search-btn-text">Search</span> <span className="search-btn-shortcut" style={{ opacity: 0.5, fontSize: 11 }}>Ctrl+K</span>
          </button>
        </nav>

        {/* Subject Header */}
        <header className="home-header" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontSize: 52,
            marginBottom: 16,
            animation: 'float 6s ease-in-out infinite',
            filter: `drop-shadow(0 4px 20px ${subject.glowColor})`,
          }}>
            {subject.emoji}
          </div>
          <h1 style={{
            fontSize: 38,
            fontWeight: 900,
            color: 'var(--text)',
            letterSpacing: '-1.5px',
            marginBottom: 14,
            lineHeight: 1.15,
          }}>
            {subject.title}
          </h1>
          <p style={{
            fontSize: 16,
            color: 'var(--muted)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            {subject.description} Select a unit below to start studying.
          </p>
        </header>

        {/* Unit Cards Grid */}
        <div className="home-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
          gap: 20,
        }}>
          {units && units.map((unit, index) => (
            <Link
              key={unit.id}
              to={`/${subjectId}/unit/${unit.id}`}
              className="home-card"
              style={{
                background: unit.gradient,
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '22px 20px',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                animation: `slideUp 0.4s ease-out ${index * 0.08}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = unit.accentColor;
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px ${unit.accentColor}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {/* Background emoji */}
              <div style={{
                position: 'absolute',
                top: -10,
                right: -10,
                fontSize: 90,
                opacity: 0.05,
                pointerEvents: 'none',
                transform: 'rotate(-10deg)',
              }}>
                {unit.emoji}
              </div>

              <div style={{
                color: unit.accentColor,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 2,
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-mono)',
              }}>
                UNIT {unit.id}
                <span style={{
                  background: `${unit.accentColor}15`,
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: 10,
                  border: `1px solid ${unit.accentColor}25`,
                  color: unit.accentColor,
                }}>
                  STUDY MATERIAL
                </span>
              </div>

              <h2 style={{
                fontSize: 26,
                fontWeight: 800,
                marginBottom: 14,
                paddingRight: 50,
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
              }}>
                {unit.title}
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 14,
                lineHeight: 1.6,
                fontFamily: 'var(--font-mono)',
                opacity: 0.85,
              }}>
                {unit.description}
              </p>

              <div style={{
                marginTop: 24,
                display: 'inline-flex',
                alignItems: 'center',
                color: unit.accentColor,
                fontWeight: 600,
                fontSize: 14,
                gap: 8,
              }}>
                Start studying <span style={{ fontSize: 18 }}>→</span>
              </div>

              {/* Emoji positioned absolutely */}
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                fontSize: 42,
                opacity: 0.7,
              }}>
                {unit.emoji}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
