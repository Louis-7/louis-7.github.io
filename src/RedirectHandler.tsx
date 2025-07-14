import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      // Remove the ?redirect=... from the URL and navigate
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}
