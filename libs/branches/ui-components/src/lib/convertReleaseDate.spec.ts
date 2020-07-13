import { convertReleaseDate } from './convertReleaseDate';

describe('Create Date object from date string', () => {
  it('should create a date in the appropriate time zone', () => {
    const dateString = '2020-05-01';

    const dateStringWithTimezone = new Date(2020, 4, 1).toISOString();

    expect(convertReleaseDate(dateString).toISOString()).toEqual(
      dateStringWithTimezone
    );
  });
});
