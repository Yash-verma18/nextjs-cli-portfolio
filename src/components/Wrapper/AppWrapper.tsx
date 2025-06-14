"use client"
import React, { useState } from 'react';
import Terminal from '../Terminal';
import CRTFrame from '../CRTIntro/CRTFrame';

const AppWrapper = () => {
  const [showIntro, setShowIntro] = useState(true);
  
  return (
    <>
      {showIntro ? (
        <CRTFrame onComplete={() => setShowIntro(false)} />
        ) : (
        <main className="flex flex-col h-screen bg-black text-glow font-mono selection:bg-green-700 selection:text-black">
            <Terminal />
        </main>
       )}
    </>
  );


};

export default AppWrapper;
