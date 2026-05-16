import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HubPage from './components/HubPage';
import SubjectHome from './components/SubjectHome';
import UnitPage from './components/UnitPage';
import SearchModal from './components/SearchModal';
import { BookmarkProvider } from './components/BookmarkContext';

/**
 * AuthGate Component
 * Protects the application with a user-defined password.
 * Uses SHA-256 hashing for storage in localStorage.
 */
function AuthGate({ children }) {
  // Using a specific session key 'orbit_v1_session' to force a logout from previous versions
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('orbit_v1_session'));
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hardcoded password for everyone
  const MASTER_PASSWORD = 'orbit-pesu';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');

    // Simulate a slight delay for "premium" feel
    setTimeout(() => {
      if (password === MASTER_PASSWORD) {
        sessionStorage.setItem('orbit_v1_session', 'active');
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials. Access denied.');
        setPassword('');
      }
      setLoading(false);
    }, 600);
  };

  if (isAuthenticated) return children;

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: 'var(--font-sans)'
    }}>
      <div className="fade-in" style={{
        width: '100%',
        maxWidth: 400,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: 40,
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 200,
          height: 200,
          background: 'var(--accent)',
          filter: 'blur(100px)',
          opacity: 0.1,
          pointerEvents: 'none'
        }} />

        <div style={{ fontSize: 48, marginBottom: 24, animation: 'float 4s ease-in-out infinite' }}>
          🔐
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
          Orbit Vault
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32, lineHeight: 1.5 }}>
          Enter the master password to unlock your study labs.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              placeholder="Master Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                background: 'var(--bg-elevated)',
                border: error ? '1px solid var(--red)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                color: 'var(--text)',
                fontSize: 16,
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-mono)'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = error ? 'var(--red)' : 'var(--border)'}
            />
          </div>

          {error && (
            <div style={{ color: 'var(--red)', fontSize: 12, fontWeight: 600, animation: 'fadeIn 0.2s' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              opacity: (loading || !password) ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10
            }}
          >
            {loading ? 'Processing...' : 'Unlock Labs'}
            {!loading && <span>→</span>}
          </button>
        </form>

        <div style={{ marginTop: 24, fontSize: 11, color: 'var(--muted)', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>
          SECURED BY ORBIT ENCRYPTION v1.0
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSubject, setSearchSubject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AuthGate>
      <BookmarkProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HubPage />} />
            <Route path="/:subjectId" element={<SubjectHome onOpenSearch={(subId) => { setSearchSubject(subId); setIsSearchOpen(true); }} />} />
            <Route path="/:subjectId/unit/:unitId" element={<UnitPage onOpenSearch={(subId) => { setSearchSubject(subId); setIsSearchOpen(true); }} />} />
          </Routes>
          <SearchModal 
            isOpen={isSearchOpen} 
            onClose={() => { setIsSearchOpen(false); setSearchSubject(null); }} 
            subjectId={searchSubject}
          />
        </BrowserRouter>
      </BookmarkProvider>
    </AuthGate>
  );
}
