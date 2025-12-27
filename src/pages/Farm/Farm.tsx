import { useRef, useEffect } from 'react';
import './Farm.css';

export function Farm() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Expose openSesame to global window for easy console access
    (window as any).openSesame = () => {
      if (iframeRef.current?.contentWindow) {
        (iframeRef.current.contentWindow as any).openSesame?.();
      } else {
        console.warn('Farm iframe not ready yet');
      }
    };

    return () => {
      // Cleanup
      delete (window as any).openSesame;
    };
  }, []);

  return (
    <div className="page-farm">
      <iframe
        ref={iframeRef}
        src="/src/shared/farm/farm.html"
        title="Farm Game"
      />
    </div>
  );
}
