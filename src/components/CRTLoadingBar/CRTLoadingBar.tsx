'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/crt-loading.css';

interface CRTLoadingBarProps {
  onComplete?: () => void;
}
const CRTLoadingBar: React.FC<CRTLoadingBarProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }

        if(prev == 85){
          return prev = 100;
        }
        return prev + 1;
      });
    }, 140); // Slower = smoother

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="crt-loading-container">
      <div className="crt-loading-label">processing...</div>

      <div className="crt-progress-bar">
        <div
          className="crt-progress-fill"
          style={{ width: `${progress}%` }}
        />
        <div className="crt-scanline-overlay" />
      </div>

      <div className="crt-progress-text">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default CRTLoadingBar;
