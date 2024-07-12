'use client';

import handler from '@/pages/api/captcha';
import { log, warn } from 'console';
import { useState, useEffect, useRef } from 'react';

let fetchedCountry: { answer: string; image: string }[] | null = null;
let fetchedCaptcha: { answer: string; image: string }[] | null = null;
let burn = false;
let paulEgg = false;
let paulChicken = false;

export default function Home() {
  const handleInputValue = (e) => {
    const valueLower = e.target.value.toLowerCase();
    const containsRestrictedChars = restrictedChars.some(char => valueLower.includes(char));
    if (!containsRestrictedChars) {
      setInputValue(e.target.value);
    }
  };

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
    fire: false,
    egg: false,
    captcha: false,
    leapYear: false,
    chicken: false,
    sacrifice: false,
  });
  const [countries, setCountries] = useState<string[]>([]);
  const [captchas, setCaptchas] = useState<string[]>([]);
  const [countryImage, setCountryImage] = useState<{ answer: string; image: string }[]>([]);
  const [captchaImage, setCaptchaImages] = useState<{ answer: string; image: string }[]>([]);
  const [showCountry, setShowCountry] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [originalValues, setOriginalValues] = useState([]);
  const intervalRef = useRef(null);
  const fireEmoji = String.fromCharCode(...[55357, 56613]);
  const fireEmojiPattern = new RegExp(fireEmoji, 'g');
  const caterpillarEmoji = String.fromCharCode(...[55357, 56347]);
  const caterpillarPattern = new RegExp(caterpillarEmoji, 'g');
  const eggEmoji = String.fromCharCode(...[55358, 56666]);
  const eggPattern = new RegExp(eggEmoji, 'g');
  const chickenEmoji = String.fromCharCode(...[55357, 56340]);
  const chickenPattern = new RegExp(chickenEmoji, 'g');
  const [rule15InputValue, setRule15InputValue] = useState('');
  const [restrictedChars, setRestrictedChars] = useState([]);
  const [showRule15, setShowRule15] = useState(false);

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

  const checkLeapYear = (inputValue: string) => {
    const years = inputValue.match(/\d+/g)?.map(Number) || [];
    for (const year of years) {
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!fetchedCountry) {
      fetch('/api/country')
        .then(response => response.json())
        .then(data => {
          fetchedCountry = data;
          setCountryImage(data);
          setCountries(data.map((img: { answer: string }) => img.answer));
        });
    } else {
      setCountryImage(fetchedCountry);
      setCountries(fetchedCountry.map((img: { answer: string }) => img.answer));
    }
  }, []);

  useEffect(() => {
    if (!fetchedCaptcha) {
      fetch('/api/captcha')
        .then(response => response.json())
        .then(data => {
          fetchedCaptcha = data;
          setCaptchaImages(data);
          setCaptchas(data.map((img: { answer: string }) => img.answer));
        });
    } else {
      setCaptchaImages(fetchedCaptcha);
      setCaptchas(fetchedCaptcha.map((img: { answer: string }) => img.answer));
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
      fire: false,
      egg: false,
      captcha: false,
      leapYear: false,
      chicken: false,
      sacrifice: false,
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
      newWarnings.digitSum = !checkDigitSum(inputValue, 30);
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
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct) {
      newWarnings.fire = fireEmojiPattern.test(inputValue);
      if (!burn) {
          setInputValue(prev => prev + '🔥');
          burn = true;
        }
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire) {
      newWarnings.egg = !/[🥚🐔]/.test(inputValue);
      if (!paulEgg && !fireEmojiPattern.test(inputValue) && newWarnings.egg) {
        setInputValue(prev => prev + '🥚');
        paulEgg = true;
      }
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg) {
      newWarnings.captcha = !captchas.some(captcha => inputValue.includes(captcha))
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha) {
      newWarnings.leapYear = !checkLeapYear(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear) {
      newWarnings.chicken = !caterpillarPattern.test(inputValue);
      if (!paulChicken && !fireEmojiPattern.test(inputValue) && newWarnings.chicken) {
        paulChicken = true;
        setInputValue(inputValue.replace(/🥚/g, chickenEmoji));
        setInputValue(prev => prev + '🐛🐛🐛🐛🐛🐛')
      }
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken) {
      if (restrictedChars.length === 0) {
        setShowRule15(true);
      }
      newWarnings.sacrifice = (restrictedChars.length === 0);
    }

    setWarnings(newWarnings);

    if (Object.values(newWarnings).slice(0, 7).every(warning => !warning)) {
      setShowCountry(true);
    } else {
      setShowCountry(false);
    }

    if (Object.values(newWarnings).slice(0, 7).every(warning => !warning)) {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
    }
  }, [inputValue, countries]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInputValue(prev => {
        if (burn) {
          for (let i = 0; i < prev.length - 1; i++) {
            if (String.fromCharCode(...[prev[i].charCodeAt(0), prev[i+1].charCodeAt(0)]) === fireEmoji) {
              return prev.slice(0, i-1) + prev.slice(i) + fireEmoji;
            }
          }
          return prev.slice(0, -1) + fireEmoji;
        }
        return prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setInputValue(prevValue => {
        if (paulChicken) {
          let newValue = prevValue;
          for (let i = 0; i < 3; i++) {
            newValue = newValue.replace('🐛', '');
          }
          return newValue;
        }
        return prevValue;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRule15InputChange = (e) => {
    const value = e.target.value;
    const uniqueValue = Array.from(new Set(value)).slice(0, 2).join('');
    setRule15InputValue(uniqueValue);
  };

  const handleRule15Click = () => {
    setRestrictedChars(rule15InputValue.split(''));
    setRule15InputValue('');
    setShowRule15(false);
  };

  const rules = [
    {
      name: 'length',
      message: 'Your password must be at least 7 characters.',
      fulfilledMessage: 'Rule 1 fulfilled',
      unfulfilledMessage: 'Rule 1 not fulfilled',
      images: null,
    },
    {
      name: 'number',
      message: 'Your password must include a number.',
      fulfilledMessage: 'Rule 2 fulfilled',
      unfulfilledMessage: 'Rule 2 not fulfilled',
      images: null,
    },
    {
      name: 'uppercase',
      message: 'Your password must include an uppercase letter.',
      fulfilledMessage: 'Rule 3 fulfilled',
      unfulfilledMessage: 'Rule 3 not fulfilled',
      images: null,
    },
    {
      name: 'specialCharacter',
      message: 'Your password must include a special character.',
      fulfilledMessage: 'Rule 4 fulfilled',
      unfulfilledMessage: 'Rule 4 not fulfilled',
      images: null,
    },
    {
      name: 'digitSum',
      message: 'The digits in your password must add up to 30.',
      fulfilledMessage: 'Rule 5 fulfilled',
      unfulfilledMessage: 'Rule 5 not fulfilled',
      images: null,
    },
    {
      name: 'month',
      message: 'Your password must include a month of the year.',
      fulfilledMessage: 'Rule 6 fulfilled',
      unfulfilledMessage: 'Rule 6 not fulfilled',
      images: null,
    },
    {
      name: 'romanNumeral',
      message: 'Your password must include a Roman numeral.',
      fulfilledMessage: 'Rule 7 fulfilled',
      unfulfilledMessage: 'Rule 7 not fulfilled',
      images: null,
    },
    {
      name: 'country',
      message: 'Your password must include one of this country.',
      fulfilledMessage: 'Rule 8 fulfilled',
      unfulfilledMessage: 'Rule 8 not fulfilled',
      images: countryImage,
    },
    {
      name: 'romanProduct',
      message: ' Roman numerals in your password should multiply to 24.',
      fulfilledMessage: 'Rule 9 fulfilled',
      unfulfilledMessage: 'Rule 9 not fulfilled',
      images: null,
    },
    {
      name: 'fire',
      message: 'Oh no! Your password is on fire 🔥. Quick, put it out!',
      fulfilledMessage: 'Rule 10 fulfilled',
      unfulfilledMessage: 'Rule 10 not fulfilled',
      images: null,
    },
    {
      name: 'egg',
      message: 'This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe.',
      fulfilledMessage: 'Rule 11 fulfilled',
      unfulfilledMessage: 'Rule 11 not fulfilled',
      images: null,
    },
    {
      name: 'captcha',
      message: 'Your password must include this CAPTCHA.',
      fulfilledMessage: 'Rule 12 fulfilled',
      unfulfilledMessage: 'Rule 12 not fulfilled',
      images: captchaImage,
    },
    {
      name: 'leapYear',
      message: 'Your password must include a leap year.',
      fulfilledMessage: 'Rule 13 fulfilled',
      unfulfilledMessage: 'Rule 13 not fulfilled',
      images: null,
    },
    {
      name: 'chicken',
      message: '🐔 Paul has hatched ! Please don’t forget to feed him. He eats 3 🐛 every 10 second.',
      fulfilledMessage: 'Rule 14 fulfilled',
      unfulfilledMessage: 'Rule 14 not fulfilled',
      images: null,
    },
    {
      name: 'sacrifice',
      message: 'A sacrifice must be made. Pick 2 letters that you will no longer be able to use.',
      fulfilledMessage: 'Rule 15 fulfilled',
      unfulfilledMessage: 'Rule 15 not fulfilled',
      images: null,
    },
  ];

  return (
    <main>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Type a word..."
        className="w-full p-3 text-lg border border-gray-300 rounded-lg text-black"
      />
      {showRule15 && (
        <div className="mt-3 flex">
          <input
            type="text"
            value={rule15InputValue}
            onChange={handleRule15InputChange}
            placeholder="Type 2 chars..."
            className="w-1/3 p-3 text-lg border border-gray-300 rounded-lg text-black"
          />
          {rule15InputValue.length == 2 && (
          <button
            onClick={handleRule15Click}
            className="ml-3 p-3 bg-blue-500 text-white rounded-lg"
          >
            Enter
          </button>
          )}
        </div>
      )}
        {rules.slice(0).reverse().map((rule, index) => (
        <div key={rule.name}>
          {Object.values(warnings).slice(0, rules.length - index).every(warning => !warning) ? (
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
              {index === rules.length - 1 || Object.values(warnings).slice(0, rules.length - index - 1).every(warning => !warning) ? (
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
