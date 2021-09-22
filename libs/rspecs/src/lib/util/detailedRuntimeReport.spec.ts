import { rspecExamplesShort } from '../mocks';
import { createDetailedRuntimeReport } from './detailedRuntimeReport';

describe('The detailed runtime report', () => {
  it('should create a detailed runtime report from a list of examples', () => {
    expect(true).toBeTruthy();
    expect(createDetailedRuntimeReport(rspecExamplesShort)).toEqual([
      {
        filePath:
          './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_packages/benefit_packages_controller_spec.rb',
        runTime: 1.032881024,
        examples: [
          {
            id: './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_packages/benefit_packages_controller_spec.rb[1:1:1]',
            description: 'should initialize the form',
            full_description:
              'BenefitSponsors::BenefitPackages::BenefitPackagesController GET new should initialize the form',
            status: 'passed',
            file_path:
              './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_packages/benefit_packages_controller_spec.rb',
            line_number: 117,
            run_time: 0.512571989,
            pending_message: null,
          },
          {
            id: './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_packages/benefit_packages_controller_spec.rb[1:1:2]',
            description: 'should be a success',
            full_description:
              'BenefitSponsors::BenefitPackages::BenefitPackagesController GET new should be a success',
            status: 'passed',
            file_path:
              './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_packages/benefit_packages_controller_spec.rb',
            line_number: 122,
            run_time: 0.520309035,
            pending_message: null,
          },
        ],
      },
      {
        filePath:
          './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_applications/benefit_applications_controller_spec.rb',
        runTime: 0.871360153,
        examples: [
          {
            id: './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_applications/benefit_applications_controller_spec.rb[1:1:1]',
            description: 'should initialize the form',
            full_description:
              'BenefitSponsors::BenefitApplications::BenefitApplicationsController GET new should initialize the form',
            status: 'passed',
            file_path:
              './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_applications/benefit_applications_controller_spec.rb',
            line_number: 120,
            run_time: 0.494754656,
            pending_message: null,
          },
          {
            id: './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_applications/benefit_applications_controller_spec.rb[1:1:2]',
            description: 'should be a success',
            full_description:
              'BenefitSponsors::BenefitApplications::BenefitApplicationsController GET new should be a success',
            status: 'passed',
            file_path:
              './components/benefit_sponsors/spec/controllers/benefit_sponsors/benefit_applications/benefit_applications_controller_spec.rb',
            line_number: 127,
            run_time: 0.376605497,
            pending_message: null,
          },
        ],
      },
    ]);
  });
});
