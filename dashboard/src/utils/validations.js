export const isNumber = number => (isNaN(number) ? false : true);
export function isMobilePhoneNumber(value) {
  // Regular expression to match common mobile phone number patterns
  const mobileRegex = /^(\+?)(\d{1,4}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  return mobileRegex.test(value);
}

export function emailValid(email) {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// username regular expression
export const USERNAME_REGEX = /^(?=.{1,100}$)(?![_.])(?!.*[_.]{2})[a-zA-Z._]+(?<![_.])$/;
// regex for english letters (A to Z) and Arabic Letters (أ to ى) only
export const NAME_REGEX = /^(?:(?=[\p{Script=Arabic}A-Za-z])\p{L}|\s)+$/u;
// validate first and last name (only letters)
export const nameIsValid = name => NAME_REGEX.test(name);
// Special Character
// eslint-disable-next-line
export const haveSpecialChar = str => /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);

// check if string have only letters (arabic and english)
export const isOnlyLetters = string => {
  return /^[A-Za-z\s]*$/.test(string) || /[\u0600-\u06FF]/.test(string);
};

// check if string has number
export const hasNumber = str => /\d/.test(str);
// check if string has letter
export const hasLetter = str => /^[A-Za-z]+$/.test(str);

// to check if string length is between passed parameters
export const nameLengthOk = (name, from, to) => name.length >= from && name.length <= to;
