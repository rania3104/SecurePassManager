
//strength levels
export type PasswordStrength = "weak" | "medium" | "strong";

//password generator options
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

//default password options
export const DEFAULT_PASSWORD_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
};

//character sets for password generation
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-={}[]|:;<>,.?/~'
};

//random password generator based on options
export function generatePassword(options: PasswordOptions = DEFAULT_PASSWORD_OPTIONS): string {
  let charset = '';
  
  if (options.includeUppercase) charset += CHAR_SETS.uppercase;
  if (options.includeLowercase) charset += CHAR_SETS.lowercase;
  if (options.includeNumbers) charset += CHAR_SETS.numbers;
  if (options.includeSymbols) charset += CHAR_SETS.symbols;
  
  if (charset === '') charset = CHAR_SETS.lowercase + CHAR_SETS.numbers;
  
  let password = '';
  const length = Math.max(options.length, 8); // Minimum 8 characters
  
  if (options.includeUppercase) 
    password += CHAR_SETS.uppercase.charAt(Math.floor(Math.random() * CHAR_SETS.uppercase.length));
  if (options.includeLowercase)
    password += CHAR_SETS.lowercase.charAt(Math.floor(Math.random() * CHAR_SETS.lowercase.length));
  if (options.includeNumbers)
    password += CHAR_SETS.numbers.charAt(Math.floor(Math.random() * CHAR_SETS.numbers.length));
  if (options.includeSymbols)
    password += CHAR_SETS.symbols.charAt(Math.floor(Math.random() * CHAR_SETS.symbols.length));
  
  //fills the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  //shuffles the password to avoid predictable pattern
  return shuffleString(password);
}

function shuffleString(str: string): string {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) return "weak";
  
  let score = 0;
  
  //length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  if (score < 4) return "weak";
  if (score < 6) return "medium";
  return "strong";
}
