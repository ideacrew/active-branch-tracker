import { FileWithRuntime, RspecExample, RspecReport } from '../models';
import { createFilesWithRuntime } from './rspecRuntimeFileList';

export interface DetailedRuntime extends FileWithRuntime {
  examples: RspecExample[];
}

export const createDetailedRuntimeReport = (
  report: RspecReport | null,
): DetailedRuntime[] | null => {
  if (!report) {
    return null;
  }

  const { examples } = report;

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
