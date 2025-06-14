'use client';

import React, { useEffect, useState } from 'react';
import TypingAnimation from '../TypingAnimation'; // adjust path as needed
import '@/styles/crt-frame.css';
import CRTLoadingBar from '../CRTLoadingBar/CRTLoadingBar';
const CRTFrame = ({ onComplete }: { onComplete: () => void }) => {
  const [time, setTime] = useState('');

  // Update time once on mount
  useEffect(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const dateString = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    setTime(`${timeString} | ${dateString}`);
  }, []);


return (
    <div className="crt-screen">
  <div className="crt-frame">
    <img src="/border3.svg" alt="CRT Border" className="crt-svg-image" />

    {/* Top-left timestamp */}
    <p className="crt-time">{time}</p>

    {/* Centered content */}
    <div className="crt-content">
    
      <div className="crt-typewriter">
        <TypingAnimation
          sequences={[
            'Welcome To',
            'Welcome To\nYash Verma\nportfolio...'
          ]}
          className="crt-typing"
        />
      </div>

      <CRTLoadingBar onComplete={onComplete} />
    </div>

    <div className="crt-footer">
     <span className="crt-footer-left">yash-verma.me</span>
     <span className="crt-footer-right">#2025</span>
    </div>
  </div>
</div>)

};

export default CRTFrame;
