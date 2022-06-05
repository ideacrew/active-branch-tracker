import { FSPullRequest } from '@idc/pull-requests/data-access';

export interface PRByAuthor {
  author: string;
  mergedPRs: FSPullRequest[];
  quantity: number;
}
