import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Place inside <BrowserRouter> — scrolls to top on every route change
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}