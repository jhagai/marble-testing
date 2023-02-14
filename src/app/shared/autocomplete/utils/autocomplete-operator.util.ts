import {catchError, debounceTime, EMPTY, Observable, OperatorFunction, switchMap} from "rxjs";

export function autocomplete<T, R>(debounceDelay: number, searchFn: (t: T) => Observable<R>): OperatorFunction<T, R> {
  return function (source$: Observable<T>) {
    return source$.pipe(
      debounceTime(debounceDelay),
      switchMap(
        data => {
          let inner: Observable<R>;
          try {
            inner = searchFn(data).pipe(
              catchError(err => {
                console.error(err);
                return EMPTY;
              }));
          } catch (e) {
            console.error(e);
            inner = EMPTY;
          }
          return inner;
        }
      )
    );
  }
}
