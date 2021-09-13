import { ScenarioElement } from '../models';

export const scenarioElement: ScenarioElement = {
  id: 'consumer-verification-process;admin-clicks-on-documents-tab-for-curam-verified-person',
  keyword: 'Scenario',
  name: 'Admin clicks on documents tab for Curam verified person',
  description: '',
  line: 57,
  type: 'scenario',
  before: [
    {
      match: {
        location:
          'vendor/bundle/ruby/2.5.0/gems/capybara-3.31.0/lib/capybara/cucumber.rb:14',
      },
      result: {
        status: 'passed',
        duration: 12600,
      },
    },
  ],
  steps: [
    {
      keyword: 'Given ',
      name: 'a consumer exists',
      line: 58,
      match: {
        location: 'features/step_definitions/verification_process_steps.rb:31',
      },
      result: {
        status: 'passed',
        duration: 90840253,
      },
      after: [
        {
          match: {
            location: 'features/step_definitions/employer_profile_steps.rb:315',
          },
          result: {
            status: 'passed',
            duration: 14700,
          },
        },
      ],
    },
    {
      keyword: 'And ',
      name: 'the consumer is logged in',
      line: 59,
      match: {
        location: 'features/step_definitions/verification_process_steps.rb:35',
      },
      result: {
        status: 'passed',
        duration: 38701,
      },
      after: [
        {
          match: {
            location: 'features/step_definitions/employer_profile_steps.rb:315',
          },
          result: {
            status: 'passed',
            duration: 5400,
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
        duration: 22401,
      },
    },
  ],
};

export const scenarioElement2: ScenarioElement = {
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
            location: 'features/step_definitions/employer_profile_steps.rb:315',
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
};

export const scenarioElement3: ScenarioElement = {
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
            location: 'features/step_definitions/employer_profile_steps.rb:315',
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
};
