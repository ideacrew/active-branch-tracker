import { CreateEventPayload } from '../interfaces';

export const createBranchPayload: CreateEventPayload = {
  ref: '29-track-branch-life-per-developer',
  ref_type: 'branch',
  master_branch: 'trunk',
  description: 'Dashboard for Work in Process for IdeaCrew repos',
  pusher_type: 'user',
  repository: {
    name: 'active-branch-tracker',
  },
  organization: {
    login: 'ideacrew',
  },
  sender: {
    login: 'markgoho',
  },
};
