import { rspecExamplesShort } from '../mocks';
import { createFilesWithRuntime } from './rspecRuntimeFileList';

describe('Rspec Report File List with Runtime', () => {
  it('should be true', () => {
    expect(createFilesWithRuntime(rspecExamplesShort)).toEqual([
      {
        filePath:
          './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_packages/benefit_packages_controller_spec.rb',
        runTime: 1.032881024,
      },
      {
        filePath:
          './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_applications/benefit_applications_controller_spec.rb',
        runTime: 0.871360153,
      },
    ]);
  });
});
