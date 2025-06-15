'use client';

import React, { useEffect, useRef, useState } from 'react';
import TypingAnimation from '../TypingAnimation';
import '@/styles/crt-frame.css';
import CRTLoadingBar from '../CRTLoadingBar/CRTLoadingBar';

interface CRTFrameProps {
  showIntro: boolean;
  userStarted: boolean;
  onComplete: () => void;
}

const CRTFrame: React.FC<CRTFrameProps> = ({ showIntro, userStarted, onComplete }) => {
  const [time, setTime] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set timestamp
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

  // Unlock audio on first interaction
  useEffect(() => {
    const unlockAudio = () => {
      setIsUnlocked(true);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  // Play CRT sound after unlock
  useEffect(() => {
    if (!isUnlocked) return;

    const audio = new Audio('/sounds/crt1.wav');
    //  const audio = new Audio('/sounds/crt2.wav');
    // const audio = new Audio('/sounds/crt.mp3');
    audio.loop = true;
    audio.volume = 0.9;

    audio.play().catch(() => {
      console.warn('Autoplay failed. User interaction required.');
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isUnlocked]);

  // Render only if intro should be shown
  if (!(showIntro && userStarted)) return null;

  return (
    <div className="crt-screen">
      <div className="crt-frame">
        <img src="/border3.svg" alt="CRT Border" className="crt-svg-image" />
        <p className="crt-time">{time}</p>

        <div className="crt-content">
          <div className="crt-typewriter">
            <TypingAnimation
              sequences={['Welcome To', 'Welcome To\nYash Verma\nportfolio...']}
              className="crt-typing"
            />
          </div>
          <CRTLoadingBar onComplete={onComplete} />
        </div>

        <div className="crt-footer">
          <span className="crt-footer-left">yash-verma.me</span>
          <span className="crt-footer-right">#2025</span>
        </div>

        <audio preload="auto" src="/sounds/crt.mp3" />
      </div>
    </div>
  );
};

export default CRTFrame;
