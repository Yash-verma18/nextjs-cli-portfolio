'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { data as portfolioData } from '@/portfolioData'; // Using alias from your previous change
import ResumeDisplay from './ResumeDisplay';
import ProjectsDisplay from './ProjectsDisplay';
interface HistoryItem {
  id: number;
  type: 'input' | 'output' | 'system' | 'error';
  content: React.ReactNode;
}


const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  const userName = portfolioData.name.toLowerCase().split(' ')[0] || 'user';
  const hostName = 'yash-verma.me';
  const PROMPT = `[dev@${hostName} ~]$ `;

  const addHistoryItem = useCallback((item: Omit<HistoryItem, 'id'>) => {
    setHistory(prev => [...prev, { ...item, id: Date.now() + prev.length }]);
  }, []);

  // Initial welcome messages and ResumeDisplay
  useEffect(() => {
   
    
    // Add the ResumeDisplay component to the initial output
    addHistoryItem({
      type: 'output', // Displayed as output, similar to a command result
      content: (
        <ResumeDisplay
          data={{
            name: portfolioData.name,
            who_am_i: portfolioData.who_am_i,
            location: portfolioData.location,
            summary: portfolioData.summary,
            experience: portfolioData.experience,
            social: portfolioData.social,
          }}
        />
      ),
    });


    addHistoryItem({ type: 'system', content: `Welcome to ${portfolioData.name}'s Interactive Portfolio!` });
    addHistoryItem({ type: 'system', content: `Type 'help' for a list of available commands.` });

  }, [addHistoryItem, portfolioData.name, portfolioData.who_am_i, portfolioData.location, portfolioData.summary]); // Added dependencies

  // Scroll to bottom and focus input on history change
  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [history]);



  const processCommand = useCallback((commandStr: string): void => {
    const [command, ...args] = commandStr.trim().split(' ');
    const fullArgs = args.join(' ');

    switch (command.toLowerCase()) {
      case 'help':
        addHistoryItem({
          type: 'output',
          content: (
            <div>
              <p>Available commands:</p>
              <ul className="list-none pl-2">
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">about</span>         - Display information about me.</li>
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">experience</span>    - Show my work experience.</li>
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">projects</span>      - Show my projects.</li>
                {/* <li><span className="text-glow-pink w-24 sm:w-28 inline-block">skills</span>        - List my skills.</li> */}
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">show-profile</span>  - Display my profile information.</li>
                {/* <li><span className="text-glow-pink w-24 sm:w-28 inline-block">contact</span>       - Show contact information.</li> */}
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">sudo hire-me</span>  - Initiate contact for hiring.</li>
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">echo [text]</span>   - Print text back to the terminal.</li>
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">date</span>          - Display the current date and time.</li>
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">whoami</span>        - Display current user.</li>
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">clear</span>         - Clear the terminal screen.</li>
                <li><span className="text-glow-pink w-24 sm:w-28 inline-block">banner</span>        - Display the welcome banner.</li>
              </ul>
            </div>
          ),
        });
        break;
      case 'echo':
        addHistoryItem({ type: 'output', content: fullArgs || '' });
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'date':
        addHistoryItem({ type: 'output', content: new Date().toString() });
        break;
      case 'whoami':
        addHistoryItem({ type: 'output', content: userName });
        break;
      case 'banner':
        addHistoryItem({ type: 'system', content: `Welcome to ${portfolioData.name}'s Interactive Portfolio!` });
        addHistoryItem({ type: 'system', content: portfolioData.who_am_i.join(' | ') });
        break;
      case 'about':
        addHistoryItem({
          type: 'output',
          content: (
            <div>
              {portfolioData.summary.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          ),
        });
        break;
      case 'experience':
        // This will be improved later to use the ExperienceSection component's logic
        portfolioData.experience.forEach(job => {
          addHistoryItem({
            type: 'output',
            content: (
              <div>
                <p className="text-blue-400">{job.key} <span className="text-green-400">@</span> <span className="text-glow-pink">{job.value}</span></p>
                <p className="text-sm text-gray-400">{job.startDate} - {job.endDate || 'Present'}</p>
                {job.summary && <p className="text-gray-300">{job.summary}</p>}
              </div>
            )
          });
        });
        if (portfolioData.experience.length === 0) {
            addHistoryItem({ type: 'output', content: "No professional experience listed yet." });
        }
        break;
      case 'show-profile':
      addHistoryItem({
          type: 'output',
          content: (
          <ResumeDisplay
              data={{
              name: portfolioData.name,
              who_am_i: portfolioData.who_am_i,
              location: portfolioData.location,
              summary: portfolioData.summary,
              experience: portfolioData.experience,
              social: portfolioData.social,
              }}
              
          />
          ),
          });
          break;
      case 'projects':
      addHistoryItem({
          type: 'output',
          content: ( <ProjectsDisplay />)});
          break;
      case 'sudo':
      if (args[0]?.toLowerCase() === 'hire-me') {
        addHistoryItem({ type: 'output', content: `Initiating contact protocol for ${portfolioData.name}...` });
        addHistoryItem({ type: 'output', content: `Please reach out to: ${portfolioData.email}` });
        window.location.href = `mailto:${portfolioData.email}?subject=Job Opportunity - ${portfolioData.name}`;
      } else {
        addHistoryItem({ type: 'error', content: `sudo: ${args[0] || ''}: command not found. Try 'sudo hire-me'.` });
      }
      break;
      case 'ls':
        
        if(args[0]?.toLowerCase() === 'projects'){
          addHistoryItem({ type: 'output', content: ( <ProjectsDisplay />)});
        }

        // else if(args[0]?.toLowerCase() === 'experience'){
        //   addHistoryItem({ type: 'output', content: ( <ExperienceDisplay />)});
        // }

        // else if(args[0]?.toLowerCase() === 'blogs'){
        //   addHistoryItem({ type: 'output', content: ( <BlogsDisplay />)});
        // }

        else{
          addHistoryItem({ type: 'output', content: 
            `"projects" | "experience" | "blogs" `});
          break;
        } 
        
      default:
        if (commandStr.trim() !== '') {
          addHistoryItem({ type: 'error', content: `${command}: command not found. Type 'help' for available commands.` });
        }
    }
  }, [addHistoryItem, portfolioData, userName]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commandToProcess = input.trim();
    setInput('');

    if (commandToProcess === '') {
      addHistoryItem({ type: 'input', content: PROMPT.trim() }); // Show empty prompt if user just hits enter
      return;
    }
    
    addHistoryItem({ type: 'input', content: commandToProcess });

    if (commandToProcess.toLowerCase() === 'clear') {
      setHistory([]); 
      return;
    }
    processCommand(commandToProcess);
  };

  return (
    <div
      className="w-full flex-grow p-4 pt-12 overflow-y-auto text-glow lowercase crt-turn-on 
            sm:p-6 sm:pt-16 
            md:mt-0 md:py-10 md:pl-20 md:pr-20 
            lg:pl-28 lg:pr-28"
      onClick={() => inputRef.current?.focus()} // Focus input on click anywhere in terminal
    >
    
      {history.map((item) => (
        <div key={item.id} className="mb-3 mt-3 leading-normal">
          {item.type === 'input' && (
            <div>
              <span className="text-glow-amber">{PROMPT}</span>
              <span >{item.content}</span>
            </div>
          )}
          {item.type === 'output' && <div className=" whitespace-pre-wrap">{item.content}</div>}
          {item.type === 'system' && <div>{item.content}</div>}
          {item.type === 'error' && <div>{item.content}</div>}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center w-fit">
        <div className="flex items-center w-fit">
          <span className="mr-1 shrink-0 text-glow-amber">{PROMPT}</span>
          <span className="text-input-mock" onClick={() => inputRef.current?.focus()}>
            {input}
            <span className="blinking-cursor">|</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="absolute left-[-9999px]" // hide input off-screen
            autoFocus
          />
      </div>
      </form>
      <div ref={endOfHistoryRef} />
    </div>
  );
};

export default Terminal;