import { BrakemanOutput } from './brakeman.interface';

/**
 * Handles brakeman output
 * @param {BrakemanOutput} output brakeman output
 * @return {Promise<void>}
 */
export async function handleBrakemanOutput(
  output: BrakemanOutput,
): Promise<void> {
  console.log({ output });
  return Promise.resolve();
}
