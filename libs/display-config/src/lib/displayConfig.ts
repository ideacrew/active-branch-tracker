export enum DisplayType {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

export interface DisplayConfig {
  deployedBranches: DisplayType;
  trackedBranches: DisplayType;
  untrackedBranches: DisplayType;
}
