import { BackgroundElement } from '../models';

export const backgroundElement: BackgroundElement = {
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
    {
      match: {
        location:
          'vendor/bundle/ruby/2.5.0/gems/capybara-3.31.0/lib/capybara/cucumber.rb:22',
      },
      result: {
        status: 'passed',
        duration: 10200,
      },
    },
    {
      match: {
        location:
          'vendor/bundle/ruby/2.5.0/gems/email_spec-2.2.0/lib/email_spec/cucumber.rb:10',
      },
      result: {
        status: 'passed',
        duration: 42601,
      },
    },
    {
      match: {
        location:
          'vendor/bundle/ruby/2.5.0/gems/capybara-screenshot-1.0.24/lib/capybara-screenshot/cucumber.rb:3',
      },
      result: {
        status: 'passed',
        duration: 7200,
      },
    },
    {
      match: {
        location: 'features/support/rails_cache.rb:1',
      },
      result: {
        status: 'passed',
        duration: 28200,
      },
    },
    {
      match: {
        location: 'features/support/rails_cache_clear.rb:1',
      },
      result: {
        status: 'passed',
        duration: 7186230,
      },
    },
    {
      match: {
        location: 'features/support/screenshots.rb:3',
      },
      result: {
        status: 'passed',
        duration: 55401,
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
            location: 'features/step_definitions/employer_profile_steps.rb:315',
          },
          result: {
            status: 'passed',
            duration: 12400,
          },
        },
      ],
    },
  ],
};
