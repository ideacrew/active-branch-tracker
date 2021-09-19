export interface FileWithRuntimeDictionary {
  [filePath: string]: {
    runTime: number;
  };
}
