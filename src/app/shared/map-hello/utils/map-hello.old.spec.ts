import {TestScheduler} from "rxjs/testing";
import {delay, Observer, of, tap} from "rxjs";
import {mapHello} from "./map-hello.util";
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('mapHello (old)', function () {
  let testScheduler: TestScheduler;

  it('should prepend incoming value with Hello.', function () {
    // GIVEN
    const source$ = of('toto', 'tata');

    // WHEN
    const actual$ = source$.pipe(mapHello());
    const spyObj: SpyObj<Observer<string>> = createSpyObj<Observer<string>>(["next", "error", "complete"]);
    actual$.subscribe(spyObj);

    // THEN
    expect(spyObj.next).toHaveBeenCalledTimes(2);
    const calls = spyObj.next.calls.all();
    expect(calls[0].args).toEqual(['Hello toto']);
    expect(calls[1].args).toEqual(['Hello tata']);
    expect(spyObj.error).not.toHaveBeenCalled();
    expect(spyObj.complete).toHaveBeenCalledTimes(1);
  });

  it('should prepend async incoming value with Hello.', function (done) {
    // GIVEN
    const source$ = of('toto', 'tata').pipe(delay(1000));

    // WHEN
    const actual$ = source$.pipe(mapHello());
    const spyObj: SpyObj<Observer<string>> = createSpyObj<Observer<string>>(["next", "error", "complete"]);
    actual$
      .pipe(tap(spyObj))
      .subscribe({
        error: err => done.fail(err),
        complete: () => {
          // THEN
          expect(spyObj.next).toHaveBeenCalledTimes(2);
          const calls = spyObj.next.calls.all();
          expect(calls[0].args).toEqual(['Hello toto']);
          expect(calls[1].args).toEqual(['Hello tata']);
          expect(spyObj.error).not.toHaveBeenCalled();
          expect(spyObj.complete).toHaveBeenCalledTimes(1);
          done();
        }
      });
  });
});
