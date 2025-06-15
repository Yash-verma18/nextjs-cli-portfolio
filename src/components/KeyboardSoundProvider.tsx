'use client';

import { useEffect, useRef } from 'react';

export default function KeyboardSoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // The space in 'keyboard 1.wav' is automatically handled by the browser.
    audioRef.current = new Audio('/sounds/keyboard 1.wav');

    const handleKeyDown = (event: KeyboardEvent) => {
      // This prevents sound from playing for modifier keys like Shift, Ctrl, Alt.
      // We allow 'Enter' and 'Backspace' to make sounds.
      if (event.key.length > 1 && event.key !== 'Enter' && event.key !== 'Backspace') {
          return;
      }
      
      if (audioRef.current) {
        // Rewind to the start to allow for rapid key presses
        audioRef.current.currentTime = 0; 
        audioRef.current.play().catch(error => {
          // Autoplay can be blocked by the browser, so we log errors.
          console.error("Error playing sound:", error)
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}