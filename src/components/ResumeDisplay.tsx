import React from 'react';
import TypingAnimation from './TypingAnimation';

interface ResumeDisplayProps {
  data: {
    name: string;
    who_am_i: string[];
    location: string;
    summary: string;
  };
}

const JsonKey: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-orange-400">{'"'}{children}{'"'}</span>
);

const JsonStringValue: React.FC<{ children: React.ReactNode, isLast?: boolean }> = ({ children, isLast }) => (
  <>
    <span className="text-amber-400">{'"'}{children}{'"'}</span>
    {!isLast && <span className="text-gray-500">,</span>}
  </>
);

const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ data }) => {
  const aboutMeLines = data.summary.includes('\n') ? data.summary.split('\n').map(line => line.trim()).filter(line => line) : [data.summary];

  return (
    <div className="font-mono text-sm leading-relaxed">
      <span className="text-gray-500">{'{'}</span>
      <div className="pl-4">
        <div>
          <JsonKey>name</JsonKey> {/* Pass children without quotes now */}
          <span className="text-gray-500">: </span>
          <JsonStringValue isLast={false}>{data.name}</JsonStringValue>
        </div>
        <div>
          <JsonKey>who_am_i</JsonKey> {/* Pass children without quotes now */}
          <span className="text-gray-500">: </span>
          <span className="text-amber-400">{'"'}</span>
          <TypingAnimation sequences={data.who_am_i} className="inline text-amber-400" />
          <span className="text-amber-400">{'"'}</span>
          <span className="text-gray-500">,</span>
        </div>
        <div>
          <JsonKey>location</JsonKey> {/* Pass children without quotes now */}
          <span className="text-gray-500">: </span>
          <JsonStringValue isLast={aboutMeLines.length === 0}>{data.location}</JsonStringValue>
        </div>
        {aboutMeLines.length > 0 && (
          <div>
            <JsonKey>about_me</JsonKey> {/* Pass children without quotes now */}
            <span className="text-gray-500">: [</span>
            <div className="pl-4">
              {aboutMeLines.map((line, index) => (
                <div key={index}>
                  <JsonStringValue isLast={index === aboutMeLines.length - 1}>{line}</JsonStringValue>
                </div>
              ))}
            </div>
            <span className="text-gray-500">]</span>
          </div>
        )}
      </div>
      <span className="text-gray-500">{'}'}</span>
    </div>
  );
};

export default ResumeDisplay;
