export interface PRBranchReference {
  ref: string; // branch name
  user: {
    login: string; // name of org or user
  };
  repo: {
    name: string; // name of repo
  };
}
