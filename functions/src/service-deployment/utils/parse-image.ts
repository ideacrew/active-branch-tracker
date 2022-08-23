import { ImageInfo } from '../interfaces';

const defaultGroups: ImageInfo = {
  registry: 'public.ecr.aws',
  owner: 'ideacrew',
  repo: 'fake',
  branch: 'fake',
  commit_sha: 'abc1234',
};

// Image looks like public.ecr.aws/ideacrew/enroll:trunk-7af3db1
export const parseImage = (
  image = 'public.ecr.aws/ideacrew/fake:fake-abc1234',
): ImageInfo => {
  const regex =
    /(?<registry>public\.ecr\.aws|ghcr\.io)\/(?<owner>ideacrew)\/(?<repo>[a-z]+):(?<branch>[\d._a-z-]+)-(?<commit_sha>[\da-f]{7})-?(?:[c-em]{2})?/gm;

  // Provide fallback in case image can't be matched
  const { groups } = regex.exec(image) ?? {
    groups: defaultGroups,
  };

  return groups as ImageInfo;
};
