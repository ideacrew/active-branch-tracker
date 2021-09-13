import { CucumberFeature } from '../models';

export const noBackgroundFeature: CucumberFeature = {
  uri: 'features/insured/enrollment_tile_pay_now.feature',
  id: 'user-should-be-able-to-pay-for-plan',
  keyword: 'Feature',
  name: 'User should be able to pay for plan',
  description: '',
  line: 1,
  elements: [
    {
      id: 'user-should-be-able-to-pay-for-plan;user-can-see-make-first-payments-for-enrollments-with-future-effective-date',
      keyword: 'Scenario',
      name: 'User can see make first payments for enrollments with future effective date',
      description: '',
      line: 2,
      type: 'scenario',
      before: [
        {
          match: {
            location:
              'vendor/bundle/ruby/2.5.0/gems/capybara-3.31.0/lib/capybara/cucumber.rb:14',
          },
          result: {
            status: 'passed',
            duration: 12500,
          },
        },
      ],
      steps: [
        {
          keyword: 'Given ',
          name: 'EnrollRegistry kaiser_pay_now feature is enabled',
          line: 3,
          match: {
            location: 'features/support/worlds/resource_registry_world.rb:40',
          },
          result: {
            status: 'passed',
            duration: 142502,
          },
          after: [
            {
              match: {
                location:
                  'features/step_definitions/employer_profile_steps.rb:315',
              },
              result: {
                status: 'passed',
                duration: 11401,
              },
            },
          ],
        },
      ],
      after: [
        {
          match: {
            location: 'features/support/warden.rb:3',
          },
          result: {
            status: 'passed',
            duration: 43101,
          },
        },
      ],
    },
  ],
};

export const featureWithBackground: CucumberFeature = {
  uri: 'features/cover_all/consumer_requests_enrollment.feature',
  id: 'consumer-requests-enrollment-in-coverall',
  keyword: 'Feature',
  name: 'Consumer requests enrollment in CoverAll',
  description:
    '  As a person who is aware in advance that he is not qualified for QHP through the\n  exchange, and has not initialized an application through EA, he can request to\n  be enrolled in CoverAll. The HBX admin can then enter their information and\n  process their application through the families index page.',
  line: 2,
  elements: [
    {
      keyword: 'Background',
      name: 'Enables features',
      description: '',
      line: 8,
      type: 'background',
      before: [
        {
          match: {
            location:
              'vendor/bundle/ruby/2.5.0/gems/capybara-3.31.0/lib/capybara/cucumber.rb:14',
          },
          result: {
            status: 'passed',
            duration: 15400,
          },
        },
      ],
      steps: [
        {
          keyword: 'Given ',
          name: 'EnrollRegistry no_transition_families feature is enabled',
          line: 9,
          match: {
            location: 'features/support/worlds/resource_registry_world.rb:40',
          },
          result: {
            status: 'passed',
            duration: 169803,
          },
          after: [
            {
              match: {
                location:
                  'features/step_definitions/employer_profile_steps.rb:315',
              },
              result: {
                status: 'passed',
                duration: 12400,
              },
            },
          ],
        },
      ],
    },
    {
      id: 'consumer-requests-enrollment-in-coverall;when-we-login-as-hbx-admin-with-only-read-permissions-then-on-family-tab-we-should-not-see-link-new-dc-resident-application',
      keyword: 'Scenario',
      name: 'When we login as Hbx admin with only read permissions then on family tab we should not see link New DC Resident Application',
      description: '',
      line: 40,
      type: 'scenario',
      steps: [
        {
          keyword: 'Given ',
          name: 'a Hbx admin with read only permissions exists',
          line: 41,
          match: {
            location: 'features/step_definitions/integration_steps.rb:324',
          },
          result: {
            status: 'passed',
            duration: 1180982801,
          },
          after: [
            {
              match: {
                location:
                  'features/step_definitions/employer_profile_steps.rb:315',
              },
              result: {
                status: 'passed',
                duration: 15501,
              },
            },
          ],
        },
      ],
      after: [
        {
          match: {
            location: 'features/support/warden.rb:3',
          },
          result: {
            status: 'passed',
            duration: 31101,
          },
        },
      ],
    },
  ],
};
