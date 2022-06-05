import { FSPullRequest } from '@idc/pull-requests/data-access';

export interface PRByRepository {
  repository: string;
  mergedPRs: FSPullRequest[];
  quantity: number;
}
