import {Observable, shareReplay} from "rxjs";

export function cacheLast<T>() {
return function ($source: Observable<T>) {
    return $source.pipe(shareReplay({refCount: false, bufferSize: 1}));
  }
}
