import { Link } from 'react-router-dom';

export default function Sidebar({ groups, topics, selectedTopicId, onSelectTopic, openGroups, toggleGroup, unitId, subjectId, isOpen, closeSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div style={{
        padding: '10px 16px',
        marginBottom: 4,
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link to={`/${subjectId}`} style={{
          fontSize: 13,
          color: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          textDecoration: 'none',
          fontFamily: 'var(--font-mono)',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          <span>←</span> Back to Units
        </Link>
        <button
          onClick={closeSidebar}
          className="hamburger-btn"
          style={{
            padding: '2px 8px',
            fontSize: 18,
            border: 'none',
            background: 'transparent',
            color: 'var(--muted)',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {groups.map(g => (
          <div key={g.name || g.group}>
            <button
              onClick={() => toggleGroup(g.name || g.group)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                padding: '10px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 11,
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                letterSpacing: 0.5,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              <span>{(g.name || g.group).toUpperCase()}</span>
              <span style={{ opacity: 0.5 }}>{openGroups.has(g.name || g.group) ? "▾" : "▸"}</span>
            </button>

            {openGroups.has(g.name || g.group) && g.ids.map(id => {
              const topic = topics[id];
              if (!topic) return null;

              const isSelected = selectedTopicId === id;

              return (
                <button
                  key={id}
                  onClick={() => onSelectTopic(id)}
                  style={{
                    width: '100%',
                    background: isSelected ? 'var(--blue-bg)' : 'none',
                    border: 'none',
                    borderLeft: isSelected ? '3px solid var(--gold)' : '3px solid transparent',
                    color: isSelected ? 'var(--gold)' : 'var(--text-secondary)',
                    padding: '9px 16px 9px 13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontWeight: isSelected ? 600 : 400,
                    transition: 'all 0.15s ease',
                  }}
                  className="sidebar-topic-btn"
                >
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{topic.emoji}</span>
                  <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {topic.title}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
