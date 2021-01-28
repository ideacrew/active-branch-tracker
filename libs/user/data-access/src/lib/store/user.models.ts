/**
 * Interface for the 'User' data
 */
export interface UserEntity {
  uid: string | undefined;
  displayName?: string;
  email?: string;
  photoURL?: string;
  disabled?: boolean;
  config: {
    automaticUpdates: boolean;
  };
}
