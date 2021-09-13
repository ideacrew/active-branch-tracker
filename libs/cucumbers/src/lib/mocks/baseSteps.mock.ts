import { BaseStep } from '../models';

export const mockBaseSteps: BaseStep[] = [
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
  {
    match: {
      location:
        'vendor/bundle/ruby/2.5.0/gems/capybara-3.31.0/lib/capybara/cucumber.rb:22',
    },
    result: {
      status: 'passed',
      duration: 7800,
    },
  },
  {
    match: {
      location:
        'vendor/bundle/ruby/2.5.0/gems/email_spec-2.2.0/lib/email_spec/cucumber.rb:10',
    },
    result: {
      status: 'passed',
      duration: 146101,
    },
  },
  {
    match: {
      location:
        'vendor/bundle/ruby/2.5.0/gems/capybara-screenshot-1.0.24/lib/capybara-screenshot/cucumber.rb:3',
    },
    result: {
      status: 'passed',
      duration: 11900,
    },
  },
  {
    match: {
      location: 'features/support/rails_cache.rb:1',
    },
    result: {
      status: 'passed',
      duration: 21000,
    },
  },
  {
    match: {
      location: 'features/support/rails_cache_clear.rb:1',
    },
    result: {
      status: 'passed',
      duration: 20844150,
    },
  },
  {
    match: {
      location: 'features/support/screenshots.rb:3',
    },
    result: {
      status: 'passed',
      duration: 57700,
    },
  },
];
