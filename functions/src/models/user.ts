export interface YellrUser {
  email: string;
  displayName: string;
  photoURL: string;
  role: YellrRole;
}

export type YellrRole = 'admin' | 'user' | 'disabled';
