import {map, Observable, OperatorFunction} from "rxjs";

export function mapHello(): OperatorFunction<string, string> {
  return function (source$: Observable<string>) {
    return source$.pipe(
      map(name => `Hello ${name}`)
    );
  }
}
