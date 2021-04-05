export type DisplayType = 'expanded' | 'collapsed';

export interface DisplayConfig {
  deployedBranches: DisplayType;
  trackedBranches: DisplayType;
  untrackedBranches: DisplayType;
}
