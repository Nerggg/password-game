'use client';
import React, { useState } from 'react';

const highlightNumbers = (text) => {
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
};

const HighlightInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 flex items-center p-3 text-lg border border-gray-300 rounded-lg pointer-events-none bg-white">
        <span className="invisible">{inputValue}</span>
        <div className="absolute inset-0 flex items-center p-3 pointer-events-none">
          {highlightNumbers(inputValue)}
        </div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Type a word..."
        className="w-full p-3 text-lg border border-gray-300 rounded-lg text-black bg-white caret-black relative z-10 bg-transparent"
      />
    </div>
  );
};

export default HighlightInput;
