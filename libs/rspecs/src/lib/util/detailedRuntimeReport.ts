import { FileWithRuntime, RspecExample } from '../models';
import { createFilesWithRuntime } from './rspecRuntimeFileList';

export interface DetailedRuntime extends FileWithRuntime {
  examples: RspecExample[];
}

export const createDetailedRuntimeReport = (
  examples: RspecExample[],
): DetailedRuntime[] => {
  const filesWithRuntime: FileWithRuntime[] = createFilesWithRuntime(examples);

  const detailedReport = filesWithRuntime.map(file => {
    const examplesForFile = examples.filter(
      example => example.file_path === file.filePath,
    );

    return {
      ...file,
      examples: examplesForFile,
    };
  });

  return detailedReport;
};
