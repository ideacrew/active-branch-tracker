export interface BranchReference {
  ref: string; // branch name
  sha: string;
  repo: {
    id: number;
    url: string;
    name: string; // name of repo
  };
}
