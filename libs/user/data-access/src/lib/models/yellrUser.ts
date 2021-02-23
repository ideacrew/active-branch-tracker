export interface YellrUser {
  org: string;
  role: YellrRole;
}

export type YellrRole = 'admin' | 'external';
