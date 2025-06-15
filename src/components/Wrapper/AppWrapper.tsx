'use client';

import React, { useState } from 'react';
import Terminal from '../Terminal';
import CRTFrame from '../CRTIntro/CRTFrame';

const AppWrapper = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    setShowIntro(true);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {/* START BUTTON */}
      {!showIntro && !hasStarted && (
        <div className="flex items-center justify-center h-screen bg-black">
          <button className="text-glow" onClick={handleStart}>
            START
          </button>
        </div>
      )}

     
      {/* CRT FRAME ANIMATION */}
      {showIntro && hasStarted && (
        <CRTFrame
          showIntro={showIntro}
          userStarted={hasStarted}
          onComplete={handleIntroComplete}
        />
      )}

      {/* MAIN TERMINAL */}
      {!showIntro && hasStarted && (
        <main className="flex flex-col h-screen bg-black text-glow font-mono selection:bg-green-700 selection:text-black">
          <Terminal />
        </main>
      )}
    </>
  );
};

export default AppWrapper;
