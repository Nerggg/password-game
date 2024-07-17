'use client';
// 11111111113111111111aaaaAugust@IVbrailVI🐔🐛🐛🐛🐛🐛🐛I want IRKjapan71
import handler from '@/pages/api/captcha';
import { log, warn } from 'console';
import next from 'next';
import { ClientPageRoot } from 'next/dist/client/components/client-page';
import { Special_Elite } from 'next/font/google';
import { spec } from 'node:test/reporters';
import { useState, useEffect, useRef } from 'react';

let fetchedCountry: { answer: string; image: string }[] | null = null;
let fetchedCaptcha: { answer: string; image: string }[] | null = null;
let burn = false;
let burnCheat = false;
let paulEgg = false;
let paulChicken = false;
let chickenCheat = false;
let sacrificeCheat = false;

export default function Home() {
  const handleInputValue = (e) => {
    const valueLower = e.target.value.toLowerCase();
    const containsRestrictedChars = restrictedChars.some(char => valueLower.includes(char));
    if (containsRestrictedChars && restrictedChars.length !== 0) {
      const regex = new RegExp(`[${restrictedChars[0].toLowerCase()}${restrictedChars[1].toLowerCase()}${restrictedChars[0].toUpperCase()}${restrictedChars[1].toUpperCase()}]`, 'g');
      const updatedValue = inputValue.replace(regex, '');
      setInputValue(updatedValue);
    }
    else {
      setInputValue(e.target.value);
    }
    console.log("current length: ", inputValue.length);
    console.log("current rule: ", currentRule);
  };

  const [currentRule, setCurrentRule] = useState(1);
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
    words: false,
    digits: false,
    includeLength: false,
    prime: false,
    time: false,
  });
  const [countries, setCountries] = useState<string[]>([]);
  const [captchas, setCaptchas] = useState<string[]>([]);
  const [countryImage, setCountryImage] = useState<{ answer: string; image: string }[]>([]);
  const [captchaImage, setCaptchaImages] = useState<{ answer: string; image: string }[]>([]);
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

  const calcDigitSum = (inputValue: string) => {
    const digits = inputValue.match(/\d/g);
    const digitSum = digits ? digits.reduce((acc, digit) => acc + parseInt(digit), 0) : 0;
    console.log("current sum: ", digitSum);
    return digitSum;
  }

  const checkDigitSum = (inputValue: string, sum: number) => {
    let digitSum = calcDigitSum(inputValue);
    return digitSum === sum;
  };
  const checkMonth = (inputValue: string) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return new RegExp(months.join("|"), "i").test(inputValue);
  };

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

  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const nextPrime = (num) => {
    while (!isPrime(num)) {
      num++;
    }
    return num;
  };

  const highlight = (text) => {
    if (currentRule === 5 || currentRule === 19) {
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
    else if (currentRule === 9) {
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
      words: false,
      digits: false,
      includeLength: false,
      prime: false,
      time: false,
    };

    if (newWarnings.length) {
      setCurrentRule(1);
    }
    if (!newWarnings.length) {
      setCurrentRule(2);
      newWarnings.number = !/\d/.test(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number) {
      setCurrentRule(3);
      newWarnings.uppercase = !/[A-Z]/.test(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase) {
      setCurrentRule(4);
      newWarnings.specialCharacter = !/[!@#$%^&*(),.?":{}|<>]/.test(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter) {
      setCurrentRule(5);
      newWarnings.digitSum = !checkDigitSum(inputValue, 40);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum) {
      setCurrentRule(6);
      newWarnings.month = !checkMonth(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month) {
      setCurrentRule(7);
      newWarnings.romanNumeral = !/[IVXLCDM]/.test(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral) {
      setCurrentRule(8);
      newWarnings.country = !countries.some(country => inputValue.includes(country));
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country) {
      setCurrentRule(9);
      newWarnings.romanProduct = !checkRomanProduct(inputValue, 24);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct) {
      setCurrentRule(10);
      newWarnings.fire = burnCheat ? false : fireEmojiPattern.test(inputValue);
      if (!burn && !burnCheat) {
        setInputValue(prev => prev + '🔥');
        burn = true;
      }
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire) {
      setCurrentRule(11);
      newWarnings.egg = !/[🥚🐔]/.test(inputValue);
      if (!paulEgg && !fireEmojiPattern.test(inputValue) && newWarnings.egg) {
        setInputValue(prev => prev + '🥚');
        paulEgg = true;
      }
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg) {
      setCurrentRule(12);
      newWarnings.captcha = !captchas.some(captcha => inputValue.includes(captcha))
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha) {
      setCurrentRule(13);
      newWarnings.leapYear = !checkLeapYear(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear) {
      setCurrentRule(14);
      newWarnings.chicken = !caterpillarPattern.test(inputValue);
      if (!paulChicken && !fireEmojiPattern.test(inputValue) && newWarnings.chicken && !chickenCheat) {
        paulChicken = true;
        setInputValue(inputValue.replace(/🥚/g, chickenEmoji));
        // setInputValue(prev => prev + '🐛🐛🐛🐛🐛🐛')
      }
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken) {
      setCurrentRule(15);
      if (restrictedChars.length === 0 && !sacrificeCheat) {
        setShowRule15(true);
      }

      newWarnings.sacrifice = sacrificeCheat ? false : restrictedChars.length === 0;
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice) {
      setCurrentRule(16);
      const validPhrases = ["I want IRK", "I need IRK", "I love IRK"];
      newWarnings.words = !validPhrases.some(phrase => inputValue.includes(phrase));
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice && !newWarnings.words) {
      setCurrentRule(17);
      const digitCount = (inputValue.match(/\d/g) || []).length;
      const percentage = (digitCount / inputValue.length) * 100;
      newWarnings.digits = !(percentage >= 30);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice && !newWarnings.words && !newWarnings.digits) {
      setCurrentRule(18);
      newWarnings.includeLength = !inputValue.includes(inputValue.length.toString());
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice && !newWarnings.words && !newWarnings.digits && !newWarnings.includeLength) {
      setCurrentRule(19);
      newWarnings.prime = !isPrime(inputValue.length);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice && !newWarnings.words && !newWarnings.digits && !newWarnings.includeLength && !newWarnings.prime) {
      setCurrentRule(20);
      newWarnings.time = !inputValue.includes(getCurrentTime());
    }
    setWarnings(newWarnings);

    const cheatIndex = inputValue.indexOf('cheat');

    if (cheatIndex !== -1) {
      switch (currentRule) {
        case 1: {
          const remainingLength = 7 - inputValue.length + 5;
          setInputValue(inputValue.replace('cheat', '') + 'a'.repeat(remainingLength));
          break;
        }
        case 2: {
          setInputValue(inputValue.replace('cheat', '') + String.fromCharCode(49 + Math.floor(Math.random() * 9)));
          break;
        }
        case 3: {
          let temp = inputValue.replace('cheat', '');
          if (!/[a-zA-Z]/.test(temp)) {
            temp += String.fromCharCode(65 + Math.floor(Math.random() * 26));
          }
          else {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i] >= 'a' && temp[i] <= 'z') {
                temp = temp.slice(0, i) + temp[i].toUpperCase() + temp.slice(i + 1);
                break;
              }
            }
          }
          setInputValue(temp);
          break;
        }
        case 4: {
          const specialChars = '!@#$%^&*(),.?":{}|<>';
          setInputValue(inputValue.replace('cheat', '') +  specialChars[Math.floor(Math.random() * specialChars.length)])
          break;
        }
        case 5: {
          let temp = inputValue;
          let target = 40 - calcDigitSum(temp);
          while (target < 0) {
            const idx = temp.search(/\d/);
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 40 - calcDigitSum(temp);
          }
          let remaining = 0;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
          }
          setInputValue(temp.replace('cheat', '') + '9'.repeat(remaining) + target);
          break;        
        }
        case 6: {
          const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          setInputValue(inputValue.replace('cheat', '') +  months[Math.floor(Math.random() * months.length)].toLowerCase());
          break;
        }
        case 7: {
          const roman = 'IVXLCDM';
          setInputValue(inputValue.replace('cheat', '') +  roman[Math.floor(Math.random() * roman.length)])
          break;
        }
        case 8: {
          setInputValue(inputValue.replace('cheat', '') +  countries[Math.floor(Math.random() * countries.length)])
          break;
        }
        case 9: {
          setInputValue(inputValue.replace('cheat', '').replace(/[IVXLCDM]/g, '') + 'XXIV');
          break;
        }
        case 10: {
          setInputValue(inputValue.replace('cheat', '').replace(fireEmojiPattern, ''));
          burn = false;
          burnCheat = true;
          break;
        }
        case 11: {        
          // harusnya gaada cheatnya
        }
        case 12: {
          let temp = inputValue;
          let target = 40 - calcDigitSum(temp) - calcDigitSum(captchas[0]);
          while (target < 0) {
            let idx = temp.search(/\d/);
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 40 - calcDigitSum(temp) - calcDigitSum(captchas[0]);
          }
          let remaining = 0;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
          }
          if (target === 0) {
            setInputValue(temp.replace('cheat', '') + '9'.repeat(remaining) + captchas[0]);
          }
          else {          
            setInputValue(temp.replace('cheat', '') + '9'.repeat(remaining) + target + captchas[0]);
          }
          break;        
        }
        case 13: {
          const startYear = 1;
          const endYear = 9;
          let year;
          do {
            year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
          } while (!(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)));

          let temp = inputValue;
          let target = 40 - calcDigitSum(temp) - calcDigitSum(String(year));
          while (target < 0) {
            const idx = temp.search(/\d/);
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 40 - calcDigitSum(temp) - calcDigitSum(String(year));
          }
          let remaining = 0;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
          }
          if (target === 0) {
            setInputValue(year + temp.replace('cheat', '') + '9'.repeat(remaining));
          }
          else {
            setInputValue(year + temp.replace('cheat', '') + '9'.repeat(remaining) + target);
          }
          break;    
        }
        case 14: {
          setInputValue(inputValue.replace('cheat', '').replace(caterpillarPattern, '') + caterpillarEmoji);
          newWarnings.chicken = false;
          paulChicken = false;
          chickenCheat = true;
          break;
        }
        case 15: {
          setInputValue(inputValue.replace('cheat', ''));
          sacrificeCheat = true;
          setShowRule15(false);
          break;
        }
        case 16: {
          const validPhrases = ["I want IRK", "I need IRK", "I love IRK"];
          setInputValue(inputValue.replace('cheat', '') +  validPhrases[Math.floor(Math.random() * validPhrases.length)]);
          break;
        }
        case 17: {
          const digitCount = (inputValue.match(/\d/g) || []).length;
          const num = Math.ceil(((inputValue.length - 5) * 0.3 - digitCount)/(0.7));
          setInputValue(inputValue.replace('cheat', '') + '0'.repeat(num));
          break;
        }
        case 18: {
          let temp = inputValue.replace('cheat', '');
          let Lengthtarget = temp.length >= 100 ? temp.length + 3 : temp.length + 2;
          let target = 40 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
          let correction = 0;
          while (target < 0) {
            let idx = temp.search(/\d/);
            if (idx === 0) {
              idx = temp.slice(1).search(/\d/) + 1;
              console.log("idx nya ", idx);
            }
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 40 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
            correction++;
          }
          let remaining = 0;
          // target = target + 1 - correction;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
          }
          setInputValue(temp + '9'.repeat(remaining) + target + (Lengthtarget + (correction - 1)));
          break;      
        }
        case 19: {
          let temp = inputValue.replace('cheat', '');
          let remainingPrime = nextPrime(temp.length) - temp.length;
          let Lengthtarget = temp.length >= 100 ? temp.length + 3 : temp.length + 2;
          let target = 40 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
          let correction = 0;
          while (target < 0) {
            let idx = temp.search(/\d/);
            if (idx === 0) {
              idx = temp.slice(1).search(/\d/) + 1;
              console.log("idx nya ", idx);
            }
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 40 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
            correction++;
          }
          let remaining = 0;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
          }
          setInputValue(temp + '9'.repeat(remaining) + target + (Lengthtarget + (correction - 1)) + '0'.repeat(remainingPrime));
          break;
        }
        case 20: {
          let temp = inputValue.replace('cheat', '');
          
          setInputValue(inputValue.replace('cheat', '') + getCurrentTime());
        }
      }
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
    }, 10000);
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
      message: 'The digits in your password must add up to 40.',
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
      message: '🐔 Paul has hatched ! Please don’t forget to feed him. He eats 3 🐛 every 10 second. We give you free 🐛 for now :D',
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
    {
      name: 'words',
      message: 'Your password must contain one of the following words: I want IRK | I need IRK | I love IRK.',
      fulfilledMessage: 'Rule 16 fulfilled',
      unfulfilledMessage: 'Rule 16 not fulfilled',
      images: null,
    },
    {
      name: 'digits',
      message: 'At least 30% of your password must be in digits.',
      fulfilledMessage: 'Rule 17 fulfilled',
      unfulfilledMessage: 'Rule 17 not fulfilled',
      images: null,
    },
    {
      name: 'includeLength',
      message: 'Your password must include the length of your password.',
      fulfilledMessage: 'Rule 18 fulfilled',
      unfulfilledMessage: 'Rule 18 not fulfilled',
      images: null,
    },
    {
      name: 'prime',
      message: 'The length of your password must be a prime number.',
      fulfilledMessage: 'Rule 19 fulfilled',
      unfulfilledMessage: 'Rule 19 not fulfilled',
      images: null,
    },
    {
      name: 'time',
      message: 'Your password must include the current time in the format of HH:MM.',
      fulfilledMessage: 'Rule 20 fulfilled',
      unfulfilledMessage: 'Rule 20 not fulfilled',
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
        maxLength={144}
        className="absolute top-0 w-full p-3 text-md border border-gray-300 rounded-lg text-transparent caret-black"
      />
      <div className="absolute top-0 w-full p-[13px] text-md z-10 text-black pointer-events-none">
        {highlight(inputValue)}
      </div>
      <div className='mt-16'>
        <div className='text-white'>Current Length: {inputValue.length}</div>
        {inputValue.length === 144 && (<div className=''>Maximum length reached!</div>)}
      </div>
      {showRule15 && (
        <div className="mt-3 flex">
          <input
            type="text"
            value={rule15InputValue}
            onChange={handleRule15InputChange}
            placeholder="Type 2 chars..."
            className="w-1/3 p-3 text-md border border-gray-300 rounded-lg text-black"
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
              <p className="text-green-500 mt-3 text-md">{rule.fulfilledMessage}</p>
              <p className="text-green-500 mt-3 text-md">{rule.message}</p>
              {rule.images && rule.images.length > 0 && (
                <div className="flex flex-row items-start">
                  {rule.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="flex flex-col items-center p-4 rounded shadow">
                      <img
                        src={`data:image/png;base64,${img.image}`}
                        alt="image"
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
                  <p className="text-red-500 mt-3 text-md">{rule.unfulfilledMessage}</p>
                  <p className="text-red-500 mt-3 text-md">{rule.message}</p>
                  {rule.images && rule.images.length > 0 && (
                    <div className="flex flex-row items-start">
                      {rule.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="flex flex-col items-center p-4 rounded shadow">
                          <img
                            src={`data:image/png;base64,${img.image}`}
                            alt="image"
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
