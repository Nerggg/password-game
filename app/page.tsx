'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [warnings, setWarnings] = useState({
    length: false,
    number: false,
    uppercase: false,
    specialCharacter: false,
    digitSum: false,
    month: false,
    romanNumeral: false,
  });

  const checkSpecialCharacter = (inputValue) => /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);
  const checkDigitSum = (inputValue, sum) => {
    const digits = inputValue.match(/\d/g);
    const digitSum = digits ? digits.reduce((acc, digit) => acc + parseInt(digit), 0) : 0;
    return digitSum === sum;
  };
  const checkMonth = (inputValue) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return new RegExp(months.join("|"), "i").test(inputValue);
  };
  // const checkRomanNumeral = (inputValue) => /\b(I|V|X|L|C|D|M)\b/.test(inputValue);
  const checkRomanNumeral = (inputValue) => /[IVXLCDM]/.test(inputValue);

  useEffect(() => {
    const newWarnings = {
      length: inputValue.length < 7,
      number: false,
      uppercase: false,
      specialCharacter: false,
      digitSum: false,
      month: false,
      romanNumeral: false,
    };

    if (!newWarnings.length) {
      newWarnings.number = !/\d/.test(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number) {
      newWarnings.uppercase = !/[A-Z]/.test(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase) {
      newWarnings.specialCharacter = !checkSpecialCharacter(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter) {
      newWarnings.digitSum = !checkDigitSum(inputValue, 10);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum) {
      newWarnings.month = !checkMonth(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month) {
      newWarnings.romanNumeral = !checkRomanNumeral(inputValue);
    }

    setWarnings(newWarnings);
  }, [inputValue]);

  const rules = [
    {
      name: 'length',
      message: 'Input should be at least 7 characters long.',
      fulfilledMessage: 'Rule 1 fulfilled',
      unfulfilledMessage: 'Rule 1 not fulfilled',
    },
    {
      name: 'number',
      message: 'Input should contain at least one number.',
      fulfilledMessage: 'Rule 2 fulfilled',
      unfulfilledMessage: 'Rule 2 not fulfilled',
    },
    {
      name: 'uppercase',
      message: 'Input should contain at least one uppercase letter.',
      fulfilledMessage: 'Rule 3 fulfilled',
      unfulfilledMessage: 'Rule 3 not fulfilled',
    },
    {
      name: 'specialCharacter',
      message: 'Input should contain at least one special character.',
      fulfilledMessage: 'Rule 4 fulfilled',
      unfulfilledMessage: 'Rule 4 not fulfilled',
    },
    {
      name: 'digitSum',
      message: 'Digits in input should add up to 10.',
      fulfilledMessage: 'Rule 5 fulfilled',
      unfulfilledMessage: 'Rule 5 not fulfilled',
    },
    {
      name: 'month',
      message: 'Input should include a month of the year.',
      fulfilledMessage: 'Rule 6 fulfilled',
      unfulfilledMessage: 'Rule 6 not fulfilled',
    },
    {
      name: 'romanNumeral',
      message: 'Input should include a Roman numeral.',
      fulfilledMessage: 'Rule 7 fulfilled',
      unfulfilledMessage: 'Rule 7 not fulfilled',
    },
  ];

  return (
    <main>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a word..."
        className="w-full p-3 text-lg border border-gray-300 rounded-lg text-black"
      />
      {rules.map((rule, index) => (
        <div key={rule.name}>
          {Object.values(warnings).slice(0, index + 1).every(warning => !warning) ? (
            <>
              <p className="text-green-500 mt-2">{rule.fulfilledMessage}</p>
              <p className="text-green-500 mt-2">{rule.message}</p>
            </>
          ) : (
            <>
              {index === 0 || Object.values(warnings).slice(0, index).every(warning => !warning) ? (
                <>
                  <p className="text-red-500 mt-2">{rule.unfulfilledMessage}</p>
                  <p className="text-red-500 mt-2">{rule.message}</p>
                </>
              ) : null}
            </>
          )}
        </div>
      ))}
    </main>
  );
}
