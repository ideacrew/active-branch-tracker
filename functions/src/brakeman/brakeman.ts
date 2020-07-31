import { BrakemanOutput } from './brakeman.interface';

export async function handleBrakemanOutput(output: BrakemanOutput) {
  console.log({ output });
  return Promise.resolve();
}
