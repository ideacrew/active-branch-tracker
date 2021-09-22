import {
  FileWithRuntime,
  FileWithRuntimeDictionary,
  RspecExample,
} from '../models';
import { rspecRuntimeDictionary } from './rspecReportFileRuntimeDictionary';

export const createFilesWithRuntime = (
  examples: RspecExample[],
): FileWithRuntime[] => {
  const runtimeDictionary: FileWithRuntimeDictionary =
    rspecRuntimeDictionary(examples);

  const filesWithRuntime: FileWithRuntime[] = Object.entries(
    runtimeDictionary,
  ).map(([key, value]) => {
    const { runTime } = value;
    return {
      // filePath: removeLeadingDotSlash(key),
      filePath: key,
      runTime: runTime,
    };
  });

  return filesWithRuntime.sort((a, b) => (a.runTime < b.runTime ? 1 : -1));
};

// const removeLeadingDotSlash = (filePath: string) =>
//   filePath.replace(/\.\//, '');
