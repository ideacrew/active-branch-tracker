import { EnrollServices } from '../models';

export interface EnvironmentIdentifier {
  orgId: string;
  envId: string;
}

export interface ServiceIdentifier extends EnvironmentIdentifier {
  serviceId: EnrollServices;
}
