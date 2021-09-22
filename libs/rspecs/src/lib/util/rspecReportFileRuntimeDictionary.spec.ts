import { rspecExamplesShort } from '../mocks';
import { rspecRuntimeDictionary } from './rspecReportFileRuntimeDictionary';

describe('Rspec Report Files with Runtime', () => {
  it('should produce a report showing the files and their runtime', () => {
    expect(rspecRuntimeDictionary(rspecExamplesShort)).toEqual({
      './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_applications/benefit_applications_controller_spec.rb':
        {
          runTime: 0.871360153,
        },

      './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_packages/benefit_packages_controller_spec.rb':
        {
          runTime: 1.032881024,
        },
    });
  });
});
