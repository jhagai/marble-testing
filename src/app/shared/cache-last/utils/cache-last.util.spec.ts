import {TestScheduler} from "rxjs/testing";
import {cacheLast} from "./cache-last.util";
import {Observable, tap} from "rxjs";

describe('cacheLast', function () {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  })

  it('should emit last received value and execute side effects only once.', () => {
    testScheduler.run(
      ({cold, flush, expectObservable}) => {
        // GIVEN
        const source = '  --a---b---c--';
        const sub1 = '    ^------------!';
        const sub2 = '    --------^---!';
        const expect1 = ' --a---b---c';
        const expect2 = ' --------b-c';
        const source$ = cold(source);

        let counter = 0;

        // WHEN
        const actual$ = source$.pipe(tap(() => counter++), cacheLast());

        // THEN
        expectObservable(actual$, sub1).toBe(expect1);
        expectObservable(actual$, sub2).toBe(expect2);

        flush();

        expect(counter).toBe(3);
      }
    );
  });

  xit('should fail', () => {

    testScheduler.run(
      ({expectObservable}) => {
        // const source$ = timer(1000).pipe(mapTo('a'));

        const source$ = new Observable(observer => {
          const timeoutId = setTimeout(() => {
            observer.next(1000);
            observer.complete();

          }, 1000);
          return () => clearTimeout(timeoutId);
        });

        expectObservable(source$).toBe('1s (a|)');
      });


  });
});
