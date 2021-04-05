import { UnaryFunction, Observable, pipe, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function filterNullish<T>(): UnaryFunction<
  Observable<T | null | undefined>,
  Observable<T>
> {
  return pipe(
    filter(x => x != null) as OperatorFunction<T | null | undefined, T>,
  );
}
