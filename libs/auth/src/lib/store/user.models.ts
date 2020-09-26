/**
 * Interface for the 'User' data
 */
export interface UserEntity {
  displayName: string;
  email: string;
  config: {
    automaticUpdates: boolean;
  };
}
