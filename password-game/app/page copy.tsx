'use client';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // Adjust the height of the textarea based on the content
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [inputValue]);

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Type a word..."
        className="absolute top-0 w-full p-3 text-lg border border-gray-300 rounded-lg text-transparent caret-black resize-none overflow-hidden"
        rows={1}
      />
      <div className="absolute top-0 w-full p-[13px] text-lg z-10 text-black pointer-events-none">
        {highlight(inputValue)}
      </div>
    </div>
  );
};

const highlight = (text) => {
  if (5 === 5 || 5 === 19) {
    return text.split('').map((char, index) => {
      if (/\d/.test(char)) {
        return (
          <span key={index} className="bg-red-500">
            {char}
          </span>
        );
      }
      return char;
    });
  }
  else if (5 === 9) {
    return text.split('').map((char, index) => {
      if (/[IVXLCDM]+/g.test(char)) {
        return (
          <span key={index} className="bg-red-500">
            {char}
          </span>
        );
      }
      return char;
    });
  }
  else {
    return (
      <span>
        {text}
      </span>
    );
  }
};

export default App;
