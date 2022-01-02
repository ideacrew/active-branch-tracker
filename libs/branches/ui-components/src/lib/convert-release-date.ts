export const convertReleaseDate = (date: string): Date =>
  new Date(`${date} 00:00:00`);
