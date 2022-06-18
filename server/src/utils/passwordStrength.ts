import { StrengthResult } from "../models/user";

const MIN_LENGTH = 8;
const MIN_LOWERCASE = 1;
const MIN_UPPERCASE = 1;
const MIN_NUMBERS = 1;
const MIN_SPECIAL = 1;
const SPECIAL_ALLOWED = "@#%^&!*";

/**
 * Check strength of password against set parameters
 *
 * @param password Password to check
 * @returns StrengthResult
 */
export function checkStrength(password: string): StrengthResult {
  const minLength = checkMinLength(password);
  const minLowerCaseChars = checkLowerCaseChars(password);
  const minUpperCaseChars = checkUpperCaseChars(password);
  const minNumbers = checkNumbers(password);
  const minSpecialChars = checkSpecialChars(password);
  const forbiddenChars = checkForbiddenChars(password);

  const strong =
    minLength &&
    minLowerCaseChars &&
    minUpperCaseChars &&
    minNumbers &&
    minSpecialChars &&
    forbiddenChars;

  const result: StrengthResult = {
    strong,
    tests: {
      minLength,
      minLowerCaseChars,
      minUpperCaseChars,
      minNumbers,
      minSpecialChars,
      forbiddenChars,
    },
  };
  return result;
}

/**
 * Checks count of characters
 */
export function checkMinLength(password: string): boolean {
  return password.length >= MIN_LENGTH;
}

/**
 * Checks count of characters a-z
 */
export function checkLowerCaseChars(password: string): boolean {
  return (password.match(/[a-z]/g) || "").length >= MIN_LOWERCASE;
}

/**
 * Checks count of characters A-Z
 */
export function checkUpperCaseChars(password: string): boolean {
  return (password.match(/[A-Z]/g) || "").length >= MIN_UPPERCASE;
}

/**
 * Checks count of characters 0-9
 */
export function checkNumbers(password: string): boolean {
  return (password.match(/[0-9]/g) || "").length >= MIN_NUMBERS;
}

/**
 * Checks count of characters @#%^&!*
 */
export function checkSpecialChars(password: string): boolean {
  const reg = new RegExp(`[${SPECIAL_ALLOWED}]`, "g");
  return (password.match(reg) || "").length >= MIN_SPECIAL;
}

/**
 * Checks for any characters not @#%^&!*, A-Z, a-z, or 0-9
 */
export function checkForbiddenChars(password: string): boolean {
  const reg = new RegExp(`[${SPECIAL_ALLOWED}A-Za-z0-9]`, "g");
  return (password.match(reg) || "").length == password.length;
}
