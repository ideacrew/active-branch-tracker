export type CheckSuiteConclusion =
  | 'success'
  | 'failure'
  | 'neutral'
  | 'cancelled'
  | 'timed_out'
  | 'action_required'
  | 'stale';

export type CheckSuiteAction = 'completed' | 'requested' | 'rerequested';

export type CheckSuiteStatus = 'requested' | 'in_progress' | 'completed';
