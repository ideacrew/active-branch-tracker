export function convertReleaseDate(date: string): Date {
  return new Date(`${date} 00:00:00`);
}
