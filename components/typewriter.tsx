import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let textIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayText((prevText) => {
        const nextChar = text.charAt(textIndex);
        textIndex++;
        return prevText + nextChar;
      });
      if (textIndex >= text.length) {
        clearInterval(typingInterval);
      }
    }, 20);
    return () => clearInterval(typingInterval);
  }, [text]);

  return <div>{displayText}</div>;
};

export default Typewriter;
