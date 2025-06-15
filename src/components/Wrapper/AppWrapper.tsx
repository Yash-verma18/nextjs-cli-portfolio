'use client';

import React, { useState } from 'react';
import Terminal from '../Terminal';
import CRTFrame from '../CRTIntro/CRTFrame';
import UpdatePrompt from '../UpdatePrompt';


const AppWrapper = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showUpdatePromptModal, setShowUpdatePromptModal] = useState(true);

  const handleRestartFromPrompt = () => {
    setHasStarted(true);
    setShowIntro(true);
    setShowUpdatePromptModal(false);
  };

  const handleLaterFromPrompt = () => {
    setShowUpdatePromptModal(false);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {/* UPDATE PROMPT INSTEAD OF START BUTTON */}
      {showUpdatePromptModal && !hasStarted && (
        <UpdatePrompt
          onRestart={handleRestartFromPrompt}
          onLater={handleLaterFromPrompt}
        />
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
