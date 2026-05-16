import { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

const STORAGE_KEY = 'orbit_bookmarks_v1';

/**
 * Each bookmark is stored as:
 * {
 *   id: "mpca__unit1__arm_intro",       // unique key
 *   subjectId: "mpca",
 *   unitId: 1,
 *   topicId: "arm_intro",
 *   topicTitle: "Introduction to ARM",
 *   topicEmoji: "💪",
 *   subjectTitle: "MPCA",
 *   unitTitle: "ARM Architecture",
 *   savedAt: 1715867400000
 * }
 */

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === bookmark.id)) return prev;
      return [...prev, { ...bookmark, savedAt: Date.now() }];
    });
  };

  const removeBookmark = (bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const isBookmarked = (bookmarkId) => {
    return bookmarks.some(b => b.id === bookmarkId);
  };

  const toggleBookmark = (bookmark) => {
    if (isBookmarked(bookmark.id)) {
      removeBookmark(bookmark.id);
    } else {
      addBookmark(bookmark);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
}
