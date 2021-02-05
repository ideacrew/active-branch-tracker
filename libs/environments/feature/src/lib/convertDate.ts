/**
 * Takes a time-less date string and converts it to local time at 6pm
 * @param inputDate an input date string like 2020-02-05
 */
export const convertDateInputToLocalDate = (inputDate: string): Date => {
  const year = +inputDate.slice(0, 4);
  const month = +inputDate.slice(5, 7);
  const day = +inputDate.slice(8, 10);

  // Month is 0-based
  const newDate = new Date(year, month - 1, day, 18);

  return newDate;
};
