import { createAction, props } from '@ngrx/store';
import { EnvironmentsEntity } from './environments.models';

export const loadEnvironments = createAction(
  '[Environments] Load Environments',
);

export const loadEnvironmentsSuccess = createAction(
  '[Environments] Load Environments Success',
  props<{ environments: EnvironmentsEntity[] }>(),
);

export const loadEnvironmentsFailure = createAction(
  '[Environments] Load Environments Failure',
  props<{ error: string }>(),
);
