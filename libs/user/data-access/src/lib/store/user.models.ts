/**
 * Interface for the 'User' data
 */
export interface UserEntity {
  uid: string;
  displayName?: string;
  email?: string;
  config: {
    automaticUpdates: boolean;
  };
}
