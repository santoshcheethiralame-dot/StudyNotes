import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HubPage from './components/HubPage';
import SubjectHome from './components/SubjectHome';
import UnitPage from './components/UnitPage';
import SearchModal from './components/SearchModal';

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
  );
}
