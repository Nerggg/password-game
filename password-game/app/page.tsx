'use client';

import { useState, useEffect } from 'react';

let fetchedImages: { answer: string; image: string }[] | null = null;

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
    country: false,
    romanProduct: false,
  });
  const [countries, setCountries] = useState<string[]>([]);
  const [images, setImages] = useState<{ answer: string; image: string }[]>([]);
  const [showImages, setShowImages] = useState(false);

  const checkSpecialCharacter = (inputValue: string) => /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);
  const checkDigitSum = (inputValue: string, sum: number) => {
    const digits = inputValue.match(/\d/g);
    const digitSum = digits ? digits.reduce((acc, digit) => acc + parseInt(digit), 0) : 0;
    return digitSum === sum;
  };
  const checkMonth = (inputValue: string) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return new RegExp(months.join("|"), "i").test(inputValue);
  };
  const checkRomanNumeral = (inputValue: string) => /[IVXLCDM]/.test(inputValue);

  const romanToInt = (s: string): number => {
    const romanMap: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };
    
    let total = 0;
    let prevValue = 0;
    
    for (let i = s.length - 1; i >= 0; i--) {
      const currentValue = romanMap[s[i]];
      if (currentValue < prevValue) {
        total -= currentValue;
      } else {
        total += currentValue;
      }
      prevValue = currentValue;
    }
    
    return total;
  };    

  const checkRomanProduct = (inputValue: string, product: number) => {
    const romanNumerals = inputValue.match(/[IVXLCDM]+/g);
    if (!romanNumerals) return false;
    const romanValues = romanNumerals.map(romanToInt);
    const romanProduct = romanValues.reduce((acc, value) => acc * value, 1);
    return romanProduct === product;
  };

  useEffect(() => {
    if (!fetchedImages) {
      fetch('/api/images')
        .then(response => response.json())
        .then(data => {
          fetchedImages = data;
          setImages(data);
          setCountries(data.map((img: { answer: string }) => img.answer));
        });
    } else {
      setImages(fetchedImages);
      setCountries(fetchedImages.map((img: { answer: string }) => img.answer));
    }
  }, []);

  useEffect(() => {
    const newWarnings = {
      length: inputValue.length < 7,
      number: false,
      uppercase: false,
      specialCharacter: false,
      digitSum: false,
      month: false,
      romanNumeral: false,
      country: false,
      romanProduct: false,
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
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral) {
      newWarnings.country = !countries.some(country => inputValue.includes(country));
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country) {
      newWarnings.romanProduct = !checkRomanProduct(inputValue, 24);
    }

    setWarnings(newWarnings);

    if (Object.values(newWarnings).slice(0, 7).every(warning => !warning)) {
      setShowImages(true);
    } else {
      setShowImages(false);
    }
  }, [inputValue, countries]);

  const rules = [
    {
      name: 'length',
      message: 'Input should be at least 7 characters long.',
      fulfilledMessage: 'Rule 1 fulfilled',
      unfulfilledMessage: 'Rule 1 not fulfilled',
      images: null,
    },
    {
      name: 'number',
      message: 'Input should contain at least one number.',
      fulfilledMessage: 'Rule 2 fulfilled',
      unfulfilledMessage: 'Rule 2 not fulfilled',
      images: null,
    },
    {
      name: 'uppercase',
      message: 'Input should contain at least one uppercase letter.',
      fulfilledMessage: 'Rule 3 fulfilled',
      unfulfilledMessage: 'Rule 3 not fulfilled',
      images: null,
    },
    {
      name: 'specialCharacter',
      message: 'Input should contain at least one special character.',
      fulfilledMessage: 'Rule 4 fulfilled',
      unfulfilledMessage: 'Rule 4 not fulfilled',
      images: null,
    },
    {
      name: 'digitSum',
      message: 'Digits in input should add up to 10.',
      fulfilledMessage: 'Rule 5 fulfilled',
      unfulfilledMessage: 'Rule 5 not fulfilled',
      images: null,
    },
    {
      name: 'month',
      message: 'Input should include a month of the year.',
      fulfilledMessage: 'Rule 6 fulfilled',
      unfulfilledMessage: 'Rule 6 not fulfilled',
      images: null,
    },
    {
      name: 'romanNumeral',
      message: 'Input should include a Roman numeral.',
      fulfilledMessage: 'Rule 7 fulfilled',
      unfulfilledMessage: 'Rule 7 not fulfilled',
      images: null,
    },
    {
      name: 'country',
      message: 'Input should contain one of the displayed countries.',
      fulfilledMessage: 'Rule 8 fulfilled',
      unfulfilledMessage: 'Rule 8 not fulfilled',
      images: images,
    },
    {
      name: 'romanProduct',
      message: 'The product of Roman numerals in input should equal 24.',
      fulfilledMessage: 'Rule 9 fulfilled',
      unfulfilledMessage: 'Rule 9 not fulfilled',
      images: null,
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
              {rule.images && rule.images.length > 0 && (
                <div className="flex flex-row items-start">
                  {rule.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="flex flex-col items-center p-4 rounded shadow">
                      <img
                        src={`data:image/png;base64,${img.image}`}
                        alt="country"
                        className="w-40 h-auto"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {index === 0 || Object.values(warnings).slice(0, index).every(warning => !warning) ? (
                <>
                  <p className="text-red-500 mt-2">{rule.unfulfilledMessage}</p>
                  <p className="text-red-500 mt-2">{rule.message}</p>
                  {rule.images && rule.images.length > 0 && (
                    <div className="flex flex-row items-start">
                      {rule.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="flex flex-col items-center p-4 rounded shadow">
                          <img
                            src={`data:image/png;base64,${img.image}`}
                            alt="country"
                            className="w-40 h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </>
          )}
        </div>
      ))}
    </main>
  );
}
