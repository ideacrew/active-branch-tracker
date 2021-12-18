export const msToMinutesAndSeconds = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = parseInt(((ms % 60000) / 1000).toFixed(0), 10);
  const runtime = `${minutes}m ${seconds}s`;

  return runtime;
};
