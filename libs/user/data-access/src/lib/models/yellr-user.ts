export interface YellrUser {
  org: string;
  role: YellrRole;
  orgs: string[];
}

export type YellrRole = 'admin' | 'external';
