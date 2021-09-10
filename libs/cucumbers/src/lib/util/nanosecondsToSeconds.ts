export const nanoSecondsToSeconds = (nanoseconds: number): string => {
  const seconds = nanoseconds / 1e9;

  const roundedSeconds = seconds.toFixed(4);

  return roundedSeconds;
};
