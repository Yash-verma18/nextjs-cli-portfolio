// src/components/ResumeDisplay.tsx
import React from 'react';
import TypingAnimation from './TypingAnimation';
import type { ExperienceItem, SocialLink } from '@/portfolioData';

interface ResumeDisplayProps {
  data: {
    name: string;
    who_am_i: string[];
    location: string;
    summary: string[];
    experience: ExperienceItem[];
    social: SocialLink[];
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
            <SyntaxChar>,</SyntaxChar>
          </div>
          
        )}
        
        <div>
          <JsonKey>experience</JsonKey>
          <SyntaxChar>: [</SyntaxChar>
          <div className="pl-4">
            {data.experience.map((exp, expIndex) => (
              <div key={expIndex}>
                <SyntaxChar>{'{'}</SyntaxChar>
                <div className="pl-4">
                  <div>
                    <JsonKey>company</JsonKey><SyntaxChar>: </SyntaxChar>
                    <JsonStringValue isLast={false}>{exp.value}</JsonStringValue>
                  </div>
                  <div>
                    <JsonKey>role</JsonKey><SyntaxChar>: </SyntaxChar>
                    <JsonStringValue isLast={false}>{exp.key}</JsonStringValue>
                  </div>
                  {exp.startDate && (
                    <div>
                      <JsonKey>period</JsonKey><SyntaxChar>: </SyntaxChar>
                      <JsonStringValue isLast={false}>{`${exp.startDate}${exp.endDate ? ' - ' + exp.endDate : ''}`}</JsonStringValue>
                    </div>
                  )}
                
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div>
                      <JsonKey>highlights</JsonKey><SyntaxChar>: [</SyntaxChar>
                      <div className="pl-4">
                        {exp.highlights.map((highlight, hlIndex) => (
                          <div key={hlIndex}>
                            <JsonStringValue isLast={hlIndex === exp.highlights!.length - 1}>{highlight}</JsonStringValue>
                          </div>
                        ))}
                      </div>
                      <SyntaxChar>]</SyntaxChar>
                    </div>
                  )}
                </div>
                <SyntaxChar>{'}'}</SyntaxChar>
                {expIndex < data.experience.length - 1 && <SyntaxChar>,</SyntaxChar>}
              </div>
            ))}
          </div>
          <SyntaxChar>]</SyntaxChar>
          <SyntaxChar>,</SyntaxChar>
        </div>
        
        <div>
          <JsonKey>socials</JsonKey><SyntaxChar>: [</SyntaxChar>
          <div className="pl-4">
            {data.social.map((social, index) => {
              const isLast = index === data.social.length - 1;
              return (
                <React.Fragment key={index}>
                  <SyntaxChar>"</SyntaxChar>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 social-link"
                  >
                    {social.value}
                  </a>
                  <SyntaxChar>"</SyntaxChar>
                  {!isLast && <SyntaxChar>, </SyntaxChar>}
                </React.Fragment>
              );
            })}
          </div>
          <SyntaxChar>]</SyntaxChar>
          {/* Removed trailing comma as this is the last element */}
        </div>
        
      </div>
      <SyntaxChar>{'}'}</SyntaxChar>
    </div>
  );
};

export default ResumeDisplay;