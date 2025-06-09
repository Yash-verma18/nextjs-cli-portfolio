'use client'; // This directive is needed for components using client-side features like hooks

import { TypeAnimation } from 'react-type-animation';

interface TypingAnimationProps {
  sequences: string[];
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ sequences, className }) => {
  if (!sequences || sequences.length === 0) {
    return null;
  }

  // The TypeAnimation component expects a sequence array where each string is followed by a delay.
  // e.g., ['Text 1', 1000, 'Text 2', 1000]
  const typeAnimationSequence = sequences.flatMap(text => [text, 1500]); // 1.5s delay after each item

  return (
    <TypeAnimation
      sequence={typeAnimationSequence}
      wrapper="span"
      speed={50}
      className={className}
      repeat={Infinity}
      cursor={true}
    />
  );
};

export default TypingAnimation;