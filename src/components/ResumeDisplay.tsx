// src/components/ResumeDisplay.tsx
import React from 'react';
import TypingAnimation from './TypingAnimation';

interface ResumeDisplayProps {
  data: {
    name: string;
    who_am_i: string[];
    location: string;
    summary: string[];
  };
}

// Helper for syntax characters like '{', '}', ':', ','
const SyntaxChar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  // Using a slightly dimmer glow for syntax characters, or you can use text-glow too
  <span className="text-glow">{children}</span>
);

const JsonKey: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-glow">{'"'}{children}{'"'}</span>
);

const JsonStringValue: React.FC<{ children: React.ReactNode; isLast?: boolean }> = ({ children, isLast }) => (
  <>
    <span className="text-glow">{'"'}{children}{'"'}</span>
    {!isLast && <SyntaxChar>,</SyntaxChar>}
  </>
);

const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ data }) => {
  
  return (
    <div className="font-mono text-sm leading-relaxed">
      <SyntaxChar>{'{'}</SyntaxChar>
      <div className="pl-4 flex flex-col gap-3">
        <div>
          <JsonKey>name</JsonKey>
          <SyntaxChar>: </SyntaxChar>
          <JsonStringValue isLast={false}>{data.name}</JsonStringValue>
        </div>
        <div>
          <JsonKey>who_am_i</JsonKey>
          <SyntaxChar>: </SyntaxChar>
          <span className="text-glow">{'"'}</span>
          {/* TypingAnimation needs to inherit or apply the glow too */}
          <TypingAnimation sequences={data.who_am_i} className="inline text-glow" />
          <span className="text-glow">{'"'}</span>
          <SyntaxChar>,</SyntaxChar>
        </div>
        <div>
          <JsonKey>location</JsonKey>
          <SyntaxChar>: </SyntaxChar>
          <JsonStringValue isLast={false}>{data.location}</JsonStringValue>
        </div>
        {data.summary.length > 0 && (
          <div>
            <JsonKey>about_me</JsonKey>
            <SyntaxChar>: [</SyntaxChar>
            <div className="pl-4">
            { data.summary.map((line, index) => (
                <div key={index}>
                  <JsonStringValue isLast={index === data.summary.length - 1}>{line}</JsonStringValue>
                </div>
              ))}
            </div>
            <SyntaxChar>]</SyntaxChar>
          </div>
        )}
      </div>
      <SyntaxChar>{'}'}</SyntaxChar>
    </div>
  );
};

export default ResumeDisplay;