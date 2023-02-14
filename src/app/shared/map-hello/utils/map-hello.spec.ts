import {TestScheduler} from "rxjs/testing";
import {mapHello} from "./map-hello.util";
import {Observable} from "rxjs";

describe('mapHello', function () {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  })
  it('should prepend incoming value with Hello.', function () {
    testScheduler.run(
      ({cold, expectObservable}) => {
        // GIVEN
        const source = '  -a-b-|';
        const expected = '-y-z-|';
        const source$: Observable<string> = cold(source, {a: 'toto', b: 'tata'});

        // WHEN
        const actual$ = source$.pipe(mapHello());

        // THEN
        expectObservable(actual$).toBe(expected, {y: 'Hello toto', z: 'Hello tata'})
      });
  });
});
