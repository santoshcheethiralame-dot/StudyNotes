import { useBookmarks } from './BookmarkContext';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../data/subjects';

export default function BookmarksPanel() {
  const { bookmarks, removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) return null;

  // Sort by most recent first
  const sorted = [...bookmarks].sort((a, b) => b.savedAt - a.savedAt);

  return (
    <div className="bookmarks-panel fade-in" style={{ marginBottom: 40 }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ fontSize: 22 }}>🔖</span>
          <h2 style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '-0.5px',
            fontFamily: 'var(--font-sans)',
          }}>
            Read Later
          </h2>
          <span style={{
            background: 'var(--gold)',
            color: '#000',
            padding: '2px 8px',
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            minWidth: 22,
            textAlign: 'center',
          }}>
            {bookmarks.length}
          </span>
        </div>
      </div>

      {/* Bookmark Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: 12,
      }}>
        {sorted.map((bm, index) => {
          const subject = SUBJECTS.find(s => s.id === bm.subjectId);
          const accentColor = subject?.accentColor || 'var(--accent)';
          const timeSaved = getRelativeTime(bm.savedAt);

          return (
            <div
              key={bm.id}
              className="bookmark-card"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '14px 16px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `slideUp 0.4s ease-out ${index * 0.05}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.3), 0 0 0 1px ${accentColor}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Subtle accent line at top */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                opacity: 0.6,
              }} />

              {/* Top row: emoji + subject badge + remove button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
              }}>
                <span style={{ fontSize: 20 }}>{bm.topicEmoji}</span>
                <span style={{
                  background: `${accentColor}15`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: 0.5,
                }}>
                  {bm.subjectTitle}
                </span>
                <span style={{
                  fontSize: 10,
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)',
                  opacity: 0.7,
                }}>
                  {timeSaved}
                </span>

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeBookmark(bm.id);
                  }}
                  style={{
                    marginLeft: 'auto',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 14,
                    transition: 'all 0.2s',
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.color = 'var(--red)';
                    e.currentTarget.style.background = 'var(--surface-hover)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = '0.5';
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                  title="Remove bookmark"
                >
                  ✕
                </button>
              </div>

              {/* Topic title as link */}
              <Link
                to={`/${bm.subjectId}/unit/${bm.unitId}?topic=${bm.topicId}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text)',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  display: 'block',
                  marginBottom: 6,
                  fontFamily: 'var(--font-sans)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = accentColor}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              >
                {bm.topicTitle}
              </Link>

              {/* Unit label */}
              <div style={{
                fontSize: 11,
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span>Unit {bm.unitId}</span>
                <span style={{ opacity: 0.3 }}>•</span>
                <span>{bm.unitTitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
