export const msToMinutesAndSeconds = (ms: number): string => {
  const minutes = Math.floor(ms / 60_000);
  const seconds = Number.parseInt(((ms % 60_000) / 1000).toFixed(0), 10);
  const runtime = `${minutes}m ${seconds}s`;

  return runtime;
};
