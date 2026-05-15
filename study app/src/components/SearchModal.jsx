import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '../data/subjects';

// Dynamic import for all topics for searching — keyed by subject
const topicsCacheBySubject = {};

const loadSubjectTopics = async (subjectId) => {
  if (topicsCacheBySubject[subjectId]) return topicsCacheBySubject[subjectId];

  const unitImporters = {
    mpca: [
      () => import('../data/mpca/unit1.js'),
      () => import('../data/mpca/unit2.js'),
      () => import('../data/mpca/unit3.js'),
      () => import('../data/mpca/unit4.js'),
    ],
    os: [
      () => import('../data/os/unit1.js'),
      () => import('../data/os/unit2.js'),
      () => import('../data/os/unit3.js'),
      () => import('../data/os/unit4.js'),
    ],
    daa: [
      () => import('../data/daa/unit1.js'),
      () => import('../data/daa/unit2.js'),
    ],
    cn: [
      () => import('../data/cn/unit1.js'),
      () => import('../data/cn/unit2.js'),
    ],
  };

  const importers = unitImporters[subjectId];
  if (!importers) return [];

  // Also load units metadata for shortTitle
  const unitsMetaModules = {
    mpca: () => import('../data/mpca/units.js'),
    os: () => import('../data/os/units.js'),
    daa: () => import('../data/daa/units.js'),
    cn: () => import('../data/cn/units.js'),
  };

  try {
    const [unitsMeta, ...modules] = await Promise.all([
      unitsMetaModules[subjectId](),
      ...importers.map(fn => fn()),
    ]);

    const combined = [];
    modules.forEach((mod, index) => {
      const unitId = index + 1;
      const unitMetaItem = unitsMeta.UNITS.find(u => u.id === unitId);

      if (mod.topics) {
        Object.entries(mod.topics).forEach(([id, topic]) => {
          combined.push({
            id,
            unitId,
            subjectId,
            unitTitle: unitMetaItem ? unitMetaItem.shortTitle : `Unit ${unitId}`,
            ...topic,
          });
        });
      }
    });

    topicsCacheBySubject[subjectId] = combined;
    return combined;
  } catch (err) {
    console.error(`Failed to load topics for ${subjectId}`, err);
    return [];
  }
};

const loadAllTopics = async () => {
  const availableSubjects = SUBJECTS.filter(s => s.available);
  const allTopics = [];

  for (const subject of availableSubjects) {
    const topics = await loadSubjectTopics(subject.id);
    allTopics.push(...topics);
  }

  return allTopics;
};

export default function SearchModal({ isOpen, onClose, subjectId }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const activeSubject = subjectId ? SUBJECTS.find(s => s.id === subjectId) : null;

  useEffect(() => {
    if (isOpen) {
      setTopics(null); // Reset to trigger reload
      setIsLoading(true);

      const loadFn = subjectId ? loadSubjectTopics(subjectId) : loadAllTopics();
      loadFn.then(data => {
        setTopics(data);
        setIsLoading(false);
      });

      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
      setActiveIndex(0);
    }
  }, [isOpen, subjectId]);

  useEffect(() => {
    if (!query.trim() || !topics) {
      setResults([]);
      setActiveIndex(0);
      return;
    }

    const q = query.toLowerCase();
    const matches = topics.filter(t => {
      if (t.title?.toLowerCase().includes(q)) return true;
      if (t.tldr?.toLowerCase().includes(q)) return true;
      if (t.keyPoints?.some(kp => kp.toLowerCase().includes(q))) return true;
      return false;
    }).slice(0, 12);

    setResults(matches);
    setActiveIndex(0);
  }, [query, topics]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === 'ArrowDown' && isOpen && results.length > 0) {
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp' && isOpen && results.length > 0) {
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && isOpen && results.length > 0) {
        e.preventDefault();
        const result = results[activeIndex];
        if (result) {
          onClose();
          navigate(`/${result.subjectId}/unit/${result.unitId}?topic=${result.id}`);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, activeIndex, navigate]);

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '12vh',
        zIndex: 1000,
        fontFamily: 'var(--font-sans)',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-modal-box" style={{
        background: 'var(--surface)',
        width: '100%',
        maxWidth: 620,
        borderRadius: 14,
        border: '1px solid var(--border)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '70vh',
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          gap: 12,
        }}>
          <span style={{ fontSize: 20, opacity: 0.7 }}>🔍</span>
          <input
            className="search-modal-input"
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={activeSubject
              ? `Search ${activeSubject.shortTitle} topics...`
              : 'Search across all subjects...'
            }
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              fontSize: 17,
              outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {activeSubject && (
            <span className="search-subject-badge" style={{
              background: `${activeSubject.accentColor}20`,
              color: activeSubject.accentColor,
              border: `1px solid ${activeSubject.accentColor}30`,
              padding: '3px 8px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
            }}>
              {activeSubject.shortTitle}
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--muted)',
              padding: '4px 8px',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ESC
          </button>
        </div>

        {/* Results area */}
        <div style={{ overflowY: 'auto', flex: 1, background: 'var(--bg)' }}>
          {isLoading && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ fontSize: 24, marginBottom: 8, animation: 'float 1.5s ease-in-out infinite' }}>🔍</div>
              Loading search index...
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>😔</div>
              No results found for "{query}"
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div style={{ padding: 8 }}>
              {results.map((result, i) => {
                const resultSubject = SUBJECTS.find(s => s.id === result.subjectId);
                return (
                  <button
                    key={`${result.subjectId}-${result.id}`}
                    onClick={() => {
                      onClose();
                      navigate(`/${result.subjectId}/unit/${result.unitId}?topic=${result.id}`);
                    }}
                    style={{
                      width: '100%',
                      background: i === activeIndex ? 'var(--surface)' : 'transparent',
                      border: 'none',
                      borderLeft: i === activeIndex ? '3px solid var(--accent)' : '3px solid transparent',
                      padding: '12px 16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '0 8px 8px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 5,
                      transition: 'all 0.1s ease',
                      marginBottom: 2,
                    }}
                    onMouseEnter={(e) => {
                      setActiveIndex(i);
                      e.currentTarget.style.background = 'var(--surface)';
                    }}
                    onMouseLeave={(e) => {
                      if (i !== activeIndex) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{result.emoji}</span>
                      <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
                        {result.title}
                      </span>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                        {!subjectId && resultSubject && (
                          <span style={{
                            fontSize: 10,
                            color: resultSubject.accentColor,
                            border: `1px solid ${resultSubject.accentColor}30`,
                            background: `${resultSubject.accentColor}10`,
                            padding: '2px 6px',
                            borderRadius: 4,
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                          }}>
                            {resultSubject.shortTitle}
                          </span>
                        )}
                        <span style={{
                          fontSize: 10,
                          color: 'var(--muted)',
                          border: '1px solid var(--border)',
                          padding: '2px 6px',
                          borderRadius: 4,
                          fontFamily: 'var(--font-mono)',
                        }}>
                          UNIT {result.unitId}
                        </span>
                      </div>
                    </div>
                    {result.tldr && (
                      <div style={{
                        color: 'var(--text-secondary)',
                        fontSize: 13,
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-mono)',
                        opacity: 0.7,
                      }}>
                        {result.tldr}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {!query && !isLoading && (
            <div style={{
              padding: 40,
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: 14,
              fontFamily: 'var(--font-mono)',
            }}>
              <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.4 }}>⌨️</div>
              {activeSubject
                ? `Type to search ${activeSubject.shortTitle} topics`
                : 'Type to search across all subjects'
              }
              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.5 }}>
                ↑↓ Navigate • Enter to select • Esc to close
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
