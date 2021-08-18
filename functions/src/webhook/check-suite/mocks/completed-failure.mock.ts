import { CheckSuitePayload } from '../interfaces';
import payload from './completed-failure.json';

export const mockFailurePayload = payload as CheckSuitePayload<'completed'>;
