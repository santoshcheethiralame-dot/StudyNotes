import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopicView from './TopicView';
import { SUBJECTS } from '../data/subjects';

// Dynamic import strategy for unit data — keyed by subject + unit
const unitModules = {
  mpca: {
    1: () => import('../data/mpca/unit1.js'),
    2: () => import('../data/mpca/unit2.js'),
    3: () => import('../data/mpca/unit3.js'),
    4: () => import('../data/mpca/unit4.js'),
  },
  os: {
    1: () => import('../data/os/unit1.js'),
    2: () => import('../data/os/unit2.js'),
    3: () => import('../data/os/unit3.js'),
    4: () => import('../data/os/unit4.js'),
  },
  daa: {
    1: () => import('../data/daa/unit1.js'),
    2: () => import('../data/daa/unit2.js'),
  },
  cn: {
    1: () => import('../data/cn/unit1.js'),
    2: () => import('../data/cn/unit2.js'),
  },
};

// Dynamic import for units metadata
const unitsMetaModules = {
  mpca: () => import('../data/mpca/units.js'),
  os: () => import('../data/os/units.js'),
  daa: () => import('../data/daa/units.js'),
  cn: () => import('../data/cn/units.js'),
};

export default function UnitPage({ onOpenSearch }) {
  const { subjectId, unitId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const idNum = parseInt(unitId, 10);
  const mainContentRef = useRef(null);

  const subject = SUBJECTS.find(s => s.id === subjectId);

  const [unitMeta, setUnitMeta] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [openGroups, setOpenGroups] = useState(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load unit metadata
  useEffect(() => {
    if (!subject || !subject.available || !unitsMetaModules[subjectId]) return;

    unitsMetaModules[subjectId]()
      .then(mod => {
        const meta = mod.UNITS.find(u => u.id === idNum);
        setUnitMeta(meta);
      })
      .catch(err => console.error("Failed to load unit metadata:", err));
  }, [subjectId, idNum, subject]);

  // Load unit data
  useEffect(() => {
    if (!subject || !unitModules[subjectId] || !unitModules[subjectId][idNum]) return;

    setLoading(true);
    unitModules[subjectId][idNum]()
      .then(module => {
        setData(module);

        const topicIdFromUrl = searchParams.get('topic');
        
        if (topicIdFromUrl && module.topics[topicIdFromUrl]) {
          // If topic is in URL, select it and open its group
          setSelectedTopicId(topicIdFromUrl);
          const parentGroup = module.groups?.find(g => g.ids.includes(topicIdFromUrl));
          if (parentGroup) {
            setOpenGroups(new Set([parentGroup.name || parentGroup.group]));
          }
        } else if (module.groups && module.groups.length > 0) {
          // Default to first topic
          const firstGroup = module.groups[0];
          const groupName = firstGroup.name || firstGroup.group;
          setOpenGroups(new Set([groupName]));

          if (firstGroup.ids && firstGroup.ids.length > 0) {
            setSelectedTopicId(firstGroup.ids[0]);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load unit data:", err);
        setLoading(false);
      });
  }, [subjectId, idNum, subject]);

  // Handle URL changes (when search result is clicked)
  useEffect(() => {
    const topicIdFromUrl = searchParams.get('topic');
    if (topicIdFromUrl && data && data.topics[topicIdFromUrl]) {
      setSelectedTopicId(topicIdFromUrl);
      const parentGroup = data.groups?.find(g => g.ids.includes(topicIdFromUrl));
      if (parentGroup) {
        setOpenGroups(prev => {
          const next = new Set(prev);
          next.add(parentGroup.name || parentGroup.group);
          return next;
        });
      }
      // Scroll main content to top
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [searchParams, data]);

  const toggleGroup = (name) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleSelectTopic = (id) => {
    setSelectedTopicId(id);
    setIsSidebarOpen(false);
    // Update URL without full navigation
    setSearchParams({ topic: id }, { replace: true });
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!subject || !subject.available) return <Navigate to="/" />;

  if (loading || !unitMeta) {
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
          <div style={{ fontSize: 48, marginBottom: 16, animation: 'float 2s ease-in-out infinite' }}>
            {subject.emoji}
          </div>
          Loading topics...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: 40, color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>
        Error loading unit data.
        <br /><br />
        <Link to={`/${subjectId}`}>Back to {subject.shortTitle}</Link>
      </div>
    );
  }

  const selectedTopic = selectedTopicId && data.topics ? data.topics[selectedTopicId] : null;

  return (
    <div className="app-container">
      {/* Header */}
      <div className="unit-header">
        <button
          className="hamburger-btn"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
        <span style={{ fontSize: 24 }}>{unitMeta.emoji}</span>
        <span className="unit-header-title" style={{
          fontWeight: 800,
          color: 'var(--gold)',
          letterSpacing: 1,
          fontFamily: 'var(--font-sans)',
          fontSize: 18,
        }}>
          {unitMeta.title.toUpperCase()}
        </span>
        <span className="unit-header-badges" style={{
          background: subject.accentColor,
          color: "#fff",
          borderRadius: 4,
          padding: "2px 8px",
          fontSize: 11,
          fontWeight: 'bold',
          fontFamily: 'var(--font-mono)',
        }}>
          UNIT {idNum}
        </span>
        <span className="unit-header-badges" style={{
          background: `${subject.accentColor}20`,
          color: subject.accentColor,
          borderRadius: 4,
          padding: "2px 8px",
          fontSize: 11,
          fontWeight: 'bold',
          fontFamily: 'var(--font-mono)',
          border: `1px solid ${subject.accentColor}30`,
        }}>
          {subject.shortTitle}
        </span>
        <div className="unit-header-badges" style={{ marginLeft: "auto", display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
            {Object.keys(data.topics || {}).length} topics
          </span>
          <button
            onClick={() => onOpenSearch && onOpenSearch(subjectId)}
            style={{
              background: 'var(--surface-hover)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--muted)',
              padding: '4px 10px',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            🔍 <span style={{ opacity: 0.6 }}>Ctrl+K</span>
          </button>
        </div>
      </div>

      <div className="unit-body">
        {/* Mobile Overlay */}
        <div
          className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <Sidebar
          groups={data.groups || []}
          topics={data.topics || {}}
          selectedTopicId={selectedTopicId}
          onSelectTopic={handleSelectTopic}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          unitId={idNum}
          subjectId={subjectId}
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="main-content" ref={mainContentRef}>
          <TopicView
            topic={selectedTopic}
            subjectId={subjectId}
            unitId={idNum}
            unitTitle={unitMeta?.title}
            subjectTitle={subject?.shortTitle}
            topicId={selectedTopicId}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="unit-footer">
        <span className="unit-footer-stats">📚 {Object.keys(data.topics || {}).length} subtopics</span>
        <span className="unit-footer-stats">•</span>
        {selectedTopic && (
          <>
            <span className="unit-footer-stats">Current: <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{selectedTopic.title}</span></span>
            <span className="unit-footer-stats">•</span>
          </>
        )}
        <span>Tip: Click any Q&A question to toggle the answer.</span>
      </div>
    </div>
  );
}
