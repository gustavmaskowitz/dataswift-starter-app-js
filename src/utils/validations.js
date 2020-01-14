const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const HAT_URL_REGEX = /^[a-z][a-z0-9]{2,19}[a-z0-9]$/;
const SPECIAL_CHARS_REGEX = /[_~\-!"`¬|:;'#@$£%^&.,*()<>]+/;
const NUMBER_FIRST_CHAR_REGEX = /^\d+/;

const ERROR_MESSAGES = {
  lengthError: 'The username must be between 4 to 21 characters.',
  uppercaseError: 'The username cannot contain uppercase letters.',
  specialCharsError: `The username cannot contain special characters. (eg.  - _ # % /)`,
  mustStartWithLetterError: 'The username must start with a letter.',
  genericError: `The format of the username is incorrect.`,
  hatExistsError: 'A HAT with this username already exists.',
};

export const isEmail = email => {
  return EMAIL_REGEX.test(email);
};

export const isHatName = hatName => {
  return HAT_URL_REGEX.test(hatName);
};

export const isNotEmptyString = value => {
  return !!value && value.length > 0;
};

export const hatNameErrorMessage = hatName => {
  let errorType = '';

  if (hatName.length < 4 || hatName.length > 21) {
    errorType = 'lengthError';
  } else if (hatName !== hatName.toLowerCase()) {
    errorType = 'uppercaseError';
  } else if (hatName.search(SPECIAL_CHARS_REGEX) >= 0) {
    errorType = `specialCharsError`;
  } else if (hatName.search(NUMBER_FIRST_CHAR_REGEX) >= 0) {
    errorType = 'mustStartWithLetterError';
  } else {
    errorType = `genericError`;
  }

  return ERROR_MESSAGES[errorType];
};