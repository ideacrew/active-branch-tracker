import { ServiceDeploymentPayload } from '../../api/models';
import { ImageInfo } from './image-info';

export type ServiceDeployment = ServiceDeploymentPayload &
  ImageInfo & { app: string };

export type FSServiceDeployment = ServiceDeployment & {
  completed: FirebaseFirestore.Timestamp;
};
