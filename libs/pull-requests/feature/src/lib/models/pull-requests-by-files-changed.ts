import { FSPullRequest } from '@idc/pull-requests/data-access';

export interface PRByFilesChanged {
  filesChanged: number;
  mergedPRs: FSPullRequest[];
  quantity: number;
}
