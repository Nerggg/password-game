'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [warningLength, setWarningLength] = useState(false);
  const [warningNumber, setWarningNumber] = useState(false);

  useEffect(() => {
    // Check for the first rule: input length
    if (inputValue.length >= 0 && inputValue.length < 7) {
      setWarningLength(true);
    } else {
      setWarningLength(false);
    }

    // Check for the second rule: contains a number
    if (inputValue.length >= 7 && !/\d/.test(inputValue)) {
      setWarningNumber(true);
    } else {
      setWarningNumber(false);
    }
  }, [inputValue]);

  return (
    <main>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a word..."
        className="w-full p-3 text-lg border border-gray-300 rounded-lg text-black"
      />
      {warningLength && (
        <div>
          <p className="text-red-500 mt-2">Rule 1 not fullfilled</p>
          <p className="text-red-500 mt-2">Input should be at least 7 characters long.</p>
        </div>
      )}
      {!warningLength && (
        <div>
          <p className="text-green-500 mt-2">Rule 1 fullfilled</p>
          <p className="text-green-500 mt-2">Input should be at least 7 characters long.</p>
        </div>
      )}
      {!warningLength && warningNumber && (
        <div>
          <p className="text-red-500 mt-2">Rule 2 not fullfilled</p>
          <p className="text-red-500 mt-2">Input should contain at least one number.</p>
        </div>
      )}
      {!warningLength && !warningNumber && (
        <div>
          <p className="text-green-500 mt-2">Rule 2 fullfilled</p>
          <p className="text-green-500 mt-2">Input should contain at least one number.</p>
        </div>
      )}
    </main>
  );
}
