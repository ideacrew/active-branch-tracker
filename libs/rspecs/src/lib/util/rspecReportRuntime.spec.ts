import { rspecExamplesShort } from '../mocks';
import { rspecReportRuntime } from './rspecReportRuntime';

describe('Rspec Report Total Runtime', () => {
  it('should produce the total runtime of a set of rspec examples', () => {
    expect(rspecReportRuntime(rspecExamplesShort)).toBeCloseTo(1.904241177, 5);
  });
});
