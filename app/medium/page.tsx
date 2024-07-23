'use client';

import { useState, useEffect, SetStateAction, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ChangeEvent } from 'react';

let fetchedCountry: { answer: string; image: string }[] | null = null;
let burn = false;
let burnCheat = false;
let paulEgg = false;
let paulChicken = false;
let chickenEat = false;
let chickenCheat = false;
let sacrificeCheat = false;

export default function Home() {
  const handleInputValue = (e: { target: { value: SetStateAction<string>; }; }) => {
    const valueLower = String(e.target.value).toLowerCase();
    const containsRestrictedChars = restrictedChars.some(char => valueLower.includes(char));
    if (containsRestrictedChars && restrictedChars.length !== 0) {
      const regex = new RegExp(`[${String(restrictedChars[0]).toLowerCase()}${String(restrictedChars[1]).toLowerCase()}${String(restrictedChars[0]).toUpperCase()}${String(restrictedChars[1]).toUpperCase()}]`, 'g');
      const updatedValue = inputValue.replace(regex, '');
      setInputValue(updatedValue);
    }
    else {
      setInputValue(e.target.value);
    }
    chickenEat = ((inputValue.match(/🐛/gi) || []).length >= 3);
  };

  const [currentRule, setCurrentRule] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [countdown, setCountdown] = useState(3600);
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
  const [rule15InputValue, setRule15InputValue] = useState<string>('');
  const [restrictedChars, setRestrictedChars] = useState<string[]>([]);
  const [showRule15, setShowRule15] = useState(false);

  const calcDigitSum = (inputValue: string) => {
    const digits = inputValue.match(/\d/g);
    const digitSum = digits ? digits.reduce((acc, digit) => acc + parseInt(digit), 0) : 0;
    chickenEat = ((inputValue.match(/🐛/gi) || []).length >= 3);
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

  const isPrime = (num: number) => {
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

  const nextPrime = (num: number) => {
    while (!isPrime(num)) {
      num++;
    }
    return num;
  };

  const highlight = (text: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined) => {
    if (currentRule === 5 || currentRule === 18 || currentRule === 17) {
      return String(text).split('').map((char: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => {
        if (/\d/.test(String(char))) {
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
      return String(text).split('').map((char: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => {
        if (/[IVXLCDM]+/g.test(String(char))) {
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        if (lines.length > 0) {
          setInputValue(lines[0]);
        }
        if (lines.length > 1) {
          setCountdown(Number(lines[1]));
        }
        if (lines.length > 2) {
          fetchCountryLoad(lines[2], lines[3], lines[4]);
        }
        if (lines.length > 5) {
          fetchCaptchaLoad(lines[5]);
        }
        if (lines.length > 6 && (lines[6].length !== 0)) {
          setRestrictedChars([lines[6], lines[7]])
        }
        if (lines.length > 8) {
          burnCheat = lines[8] === 'true' ? true : false;
        }
        if (lines.length > 9) {
          chickenCheat = lines[9] === 'true' ? true : false;
        }
      };
      reader.readAsText(file);
    }
  };

  const handleLoadClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleSaveClick = () => {
    const blob = restrictedChars.length === 0 ? new Blob([`${inputValue}\n${countdown}\n${countries[0]}\n${countries[1]}\n${countries[2]}\n${captchas[0]}\n\n\n${burnCheat}\n${chickenCheat}`], { type: 'text/plain;charset=utf-8' }) : new Blob([`${inputValue}\n${countdown}\n${countries[0]}\n${countries[1]}\n${countries[2]}\n${captchas[0]}\n${restrictedChars[0]}\n${restrictedChars[1]}\n${burnCheat}\n${chickenCheat}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'save.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fetchCountryLoad = async (country1: any, country2: any, country3: any) => {
    const countryNames = [country1, country2, country3];
    const response = await fetch(`/api/country?countryNames=${countryNames.join(',')}`);
    const data = await response.json();
    setCountryImage(data);
    setCountries(data.map((img: { answer: string }) => img.answer));

    console.log(data);
  };
  
  const fetchCaptchaLoad = async (captchaName: any) => {
    const response = await fetch(`/api/captcha?captchaName=${captchaName}`);
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    } else {
      setCaptchaImages(data);
      setCaptchas(data.map((img: { answer: string }) => img.answer));
    }
    console.log(data);
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

  const fetchCaptcha = async () => {
    const response = await fetch('/api/captcha');
    const data = await response.json();
    setCaptchaImages(data);
    setCaptchas(data.map((img: { answer: string }) => img.answer));
  };

  useEffect(() => {
    if (countdown > 0) {
      if (!isWin && !isLose) {
        const timer = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
  
        return () => clearInterval(timer);
      }
      else if (isLose) {
        setCountdown(0);
      } 
    } else {
      setIsLose(true);
    }
  }, [countdown]);

  useEffect(() => {
    fetchCaptcha();
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
      newWarnings.digitSum = !checkDigitSum(inputValue, 99);
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
      if (!burn && !burnCheat) {
        newWarnings.fire = true;
        setInputValue(prev => prev + fireEmoji);
        burn = true;
      }
      newWarnings.fire = burnCheat ? false : fireEmojiPattern.test(inputValue);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire) {
      setCurrentRule(11);
      newWarnings.egg = !/[🥚🐔]/.test(inputValue);
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
      newWarnings.chicken = isWin ? false : !((inputValue.match(/🐛/gi) || []).length >= 3);
      if (!paulChicken && !fireEmojiPattern.test(inputValue) && newWarnings.chicken && !chickenCheat) {
        paulChicken = true;
        setInputValue(inputValue.replace(/🥚/g, chickenEmoji));
        setInputValue(prev => prev + '🐛🐛🐛')
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
      newWarnings.includeLength = isWin ? false : !inputValue.includes(inputValue.length.toString());
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice && !newWarnings.words && !newWarnings.digits && !newWarnings.includeLength) {
      setCurrentRule(19);
      newWarnings.prime = !isPrime(inputValue.length);
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice && !newWarnings.words && !newWarnings.digits && !newWarnings.includeLength && !newWarnings.prime) {
      setCurrentRule(20);
      newWarnings.time = !inputValue.includes(getCurrentTime());
    }
    if (!newWarnings.length && !newWarnings.number && !newWarnings.uppercase && !newWarnings.specialCharacter && !newWarnings.digitSum && !newWarnings.month && !newWarnings.romanNumeral && !newWarnings.country && !newWarnings.romanProduct && !newWarnings.fire && !newWarnings.egg && !newWarnings.captcha && !newWarnings.leapYear && !newWarnings.chicken && !newWarnings.sacrifice && !newWarnings.words && !newWarnings.digits && !newWarnings.includeLength && !newWarnings.prime && !newWarnings.time) {
      setIsWin(true);
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
          let target = 99 - calcDigitSum(temp);
          while (target < 0) {
            const idx = temp.search(/\d/);
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 99 - calcDigitSum(temp);
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
          setInputValue(inputValue.replace('cheat', '').replace(fireEmoji, ''));
          burn = false;
          burnCheat = true;
          break;
        }
        case 11: {        
          // harusnya gaada cheatnya
        }
        case 12: {
          let temp = inputValue;
          let target = 99 - calcDigitSum(temp) - calcDigitSum(captchas[0]);
          while (target < 0) {
            let idx = temp.search(/\d/);
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 99 - calcDigitSum(temp) - calcDigitSum(captchas[0]);
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
          let target = 99 - calcDigitSum(temp) - calcDigitSum(String(year));
          while (target < 0) {
            const idx = temp.search(/\d/);
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 99 - calcDigitSum(temp) - calcDigitSum(String(year));
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
          setInputValue(inputValue.replace('cheat', '').replace(caterpillarPattern, '') + caterpillarEmoji.repeat(3));
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
          let Lengthtarget = temp.length >= 98 ? temp.length + 3 : temp.length + 2;
          let target = 99 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
          let correction = 0;
          while (target < 0) {
            let idx = temp.search(/\d/);
            if (idx === 0) {
              idx = temp.slice(1).search(/\d/) + 1;
            }
            temp = temp.slice(0, idx) + temp.slice(idx + 1);
            target = 99 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
            correction++;
          }
          let remaining = 0;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
            correction--;
          }
          setInputValue(temp + '9'.repeat(remaining) + (target + correction - 1) + (Lengthtarget - (correction - 1)));
          break;      
        }
        case 19: {
          let temp = inputValue.replace('cheat', '');
          let remainingPrime = temp.length >= 98 ? nextPrime(temp.length + 4) - temp.length : nextPrime(temp.length + 3) - temp.length;
          temp = temp.length >= 98 ? temp + '0'.repeat(remainingPrime - 4) : temp + '0'.repeat(remainingPrime - 3);
          let Lengthtarget = temp.length >= 98 ? temp.length + 4 : temp.length + 3;
          let target = 99 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
          while (target < 0) {
            let idx = temp.search(/\d/);
            if (idx === 0) {
              idx = temp.slice(1).search(/\d/) + 1;
            }
            temp = temp.slice(0, idx) + temp.slice(idx + 1) + '0';
            target = 99 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
          }
          let remaining = 0;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
          }
          setInputValue(temp + '9'.repeat(remaining) + target + Lengthtarget);
          break;    
        }
        case 20: {
          let temp = inputValue.replace('cheat', '');
          temp = temp + getCurrentTime();
          let remainingPrime = temp.length >= 98 ? nextPrime(temp.length + 4) - temp.length : nextPrime(temp.length + 3) - temp.length;
          temp = temp.length >= 98 ? temp + '0'.repeat(remainingPrime - 4) : temp + '0'.repeat(remainingPrime - 3);
          let Lengthtarget = temp.length >= 98 ? temp.length + 4 : temp.length + 3;
          let target = 99 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
          while (target < 0) {
            let idx = temp.search(/\d/);
            if (idx === 0) {
              idx = temp.slice(1).search(/\d/) + 1;
            }
            temp = temp.slice(0, idx) + temp.slice(idx + 1) + '0';
            target = 99 - calcDigitSum(temp) - calcDigitSum(String(Lengthtarget));
          }
          let remaining = 0;
          while (target >= 10) {
            target -= 9;
            remaining += 1;
          }
          setInputValue(temp + '9'.repeat(remaining) + target + Lengthtarget);
          break;    
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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentRule === 10 && !paulEgg && !inputValue.includes(fireEmoji) && !inputValue.includes(chickenEmoji)) {
      paulEgg = true;
      setInputValue((prev) => prev + eggEmoji);
    }
    if (paulEgg && (inputValue.includes(eggEmoji) || inputValue.includes(chickenEmoji))) {
      setIsLose(false);
    }
    else if (paulEgg && !inputValue.includes(eggEmoji)) {
      setIsLose(true);
    }
  }, [inputValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInputValue(prevValue => {
        if (paulChicken) {
          let newValue = prevValue;
          if (!chickenEat) {
            newValue = newValue.replace('🐔', '');
          }
          else {
            for (let i = 0; i < 3; i++) {
              newValue = newValue.replace('🐛', '');
            }
          }
          return newValue;
        }
        return prevValue;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRule15InputChange = (e: { target: { value: any; }; }) => {
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
      message: 'The digits in your password must add up to 99.',
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
        className="absolute top-0 w-full p-3 text-sm border border-gray-300 rounded-lg text-transparent caret-black"
        disabled={isLose || isWin}
      />
      {/* <div className='text-white mt-14'>{inputValue.slice(1, 2)}</div> */}
      <div className="absolute top-0 w-full p-[13px] text-sm z-10 text-black pointer-events-none">
        {highlight(inputValue)}
      </div>
      {isWin && (
        <div className='absolute top-0 w-full text-green-500 font-bold text-xl text-center z-10'>wow menang :D</div>
      )}
      {isLose && !isWin && (
        <div className='absolute top-0 w-full text-red-500 font-bold text-xl text-center z-10'>kalah wkwk</div>
      )}
      <div className='mt-14'>
        <button onClick={handleSaveClick} className='mx-2 px-4 py-2 rounded-lg bg-blue-500'>Save</button>
        <button onClick={handleLoadClick} className='mx-2 px-4 py-2 rounded-lg bg-blue-500'>Load</button>
        <input
          type="file"
          id="fileInput"
          accept=".txt"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>      
      <div className='mt-3'>
        <div className='text-white'>Score: {countdown}</div>
      </div>
      <div className='mt-3'>
        <div className='text-white'>Current Length: {inputValue.length}</div>
        {inputValue.length === 144 && (<div className=''>Maximum length reached!</div>)}
      </div>
      <div className='mt-3'>
        <div className='text-white'>Current Digit Sum: {calcDigitSum(inputValue)}</div>
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
                          {currentRule === 12 && (
                            <button onClick={fetchCaptcha} className="mt-2 p-2 bg-blue-500 text-white rounded">Refresh</button>
                          )}
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
