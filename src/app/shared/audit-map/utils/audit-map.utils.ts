import {audit, finalize, mergeMap, Observable, of, OperatorFunction, Subject} from "rxjs";

export function auditMap<T, R>(project: (v: T) => Observable<R>): OperatorFunction<T, R> {
  return function (source$) {

    const subject = new Subject<T>();
    let isRunning = false;
    return source$.pipe(
      audit(v => {
        if (isRunning) {
          return subject.asObservable()
        } else {
          return of(v);
        }
      }),
      mergeMap(v => {
          isRunning = true;
          return project(v)
            .pipe(finalize(() => {
              isRunning = false;
              subject.next(v);
            }));
        }
      )
    );
  }
}
