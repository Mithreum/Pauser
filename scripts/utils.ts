import { config } from 'dotenv';
config();

/**
 * Validates the key is present
 * @param key the .env lookup key
 * @param error the error message
 * @returns the value or throws an error
 */
export function readENV(key: string): string {
  const found = process.env[key];
  if (found) {
    return found;
  } else {
    // throw new Error(`${key} is missing in .env`);
    console.log(`${key} is missing in .env`)
    return ""
  }
}
