'use client';
import React, { useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const highlightNumbers = (text) => {
    return text.split('').map((char, index) => {
      if (/\d/.test(char)) {
        return (
          <span key={index} className="bg-red-500 z-10">
            {char}
          </span>
        );
      }
      return char;
    });
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Type a word..."
        className="absolute w-full p-3 text-lg border border-gray-300 rounded-lg text-transparent caret-black"
      />
      <div className="absolute p-[13px] text-lg z-10 text-black">
        {highlightNumbers(inputValue)}
      </div>
    </div>
  );
};

export default App;
