export enum DisplayType {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

export interface DisplayConfig {
  trackedBranches: DisplayType;
  otherBranches: DisplayType;
}
