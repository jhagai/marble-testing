import {TestScheduler} from "rxjs/testing";
import {autocomplete} from "./autocomplete-operator.util";

describe('autocomplete-operator', () => {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  })

  it('should wait before triggering the search.', () => {

    testScheduler.run(
      ({cold, time, expectObservable, expectSubscriptions}) => {
        const source = '  -a-- |';
        const debounce = ' -|';
        const search = '    -z|';
        const expected = '---z|';
        const expSub = '  --^-!';
        const source$ = cold(source);
        const search$ = cold(search, {z: 'output'});
        const debTime = time(debounce);

        const actual$ = source$.pipe(autocomplete(debTime, () => search$));

        expectObservable(actual$).toBe(expected, {z: 'output'});
        expectSubscriptions(search$.subscriptions).toBe(expSub);
      }
    );
  });

  it('should discard every incoming value within the debounce delay before triggering the search.', () => {

    testScheduler.run(
      ({cold, time, expectObservable, expectSubscriptions}) => {
        const source = '  -a-b---|';
        const debounce = ' ---|';
        //                   ---|
        const search = '        -z|';
        const expected = '-------z|';
        const expSub1 = ''; // First search is never subscribed.
        const expSub2 = ' ------^-!';
        const source$ = cold(source);
        const search1$ = cold(search, {z: 'output1'});
        const search2$ = cold(search, {z: 'output2'});
        const debTime = time(debounce);

        const actual$ = source$.pipe(autocomplete(debTime, v => v === 'a' ? search1$ : search2$));

        expectObservable(actual$).toBe(expected, {z: 'output2'});
        expectSubscriptions(search1$.subscriptions).toBe(expSub1);
        expectSubscriptions(search2$.subscriptions).toBe(expSub2);
      }
    );
  });

  it('should discard ongoing search if source emits new value in the mean time.', () => {

    testScheduler.run(
      ({cold, flush, time, expectObservable, expectSubscriptions}) => {
        // GIVEN
        const source = '  -a-b--------|';
        const debounce = ' -|          ';
        const search = '    ---z|      ';
        // other debounce    -|
        // second search      ---z|
        const expected = '-------z----|';
        const expSub1 = ' --^-!';
        const expSub2 = ' ----^---!';
        const source$ = cold(source);
        const debTime = time(debounce);
        const search1$ = cold(search, {z: 'output1'});
        const search2$ = cold(search, {z: 'output2'});

        // WHEN
        const actual$ = source$.pipe(autocomplete(debTime, v => v === 'a' ? search1$ : search2$));

        // THEN
        expectObservable(actual$).toBe(expected, {z: 'output2'});
        expectSubscriptions(search1$.subscriptions).toBe(expSub1);
        expectSubscriptions(search2$.subscriptions).toBe(expSub2);
      }
    );
  });

  it('should emit all values when no overlap', () => {

    testScheduler.run(
      ({cold, time, expectObservable, expectSubscriptions}) => {
        // GIVEN
        const source = '  -a---b----|';
        const debounce = ' -|'
        const search1 = '   -y|';
        //                     -|
        const search2 = '       -z|';
        const expected = '---y---z--|';
        const expSub1 = ' --^-!';
        const expSub2 = ' ------^-!';
        const source$ = cold(source);
        const search1$ = cold(search1, {y: 'output1'});
        const search2$ = cold(search2, {z: 'output2'});
        const debDelay = time(debounce);

        // WHEN
        const actual$ = source$.pipe(autocomplete(debDelay, v => v === 'a' ? search1$ : search2$));

        // THEN
        expectObservable(actual$).toBe(expected, {y: 'output1', z: 'output2'});
        expectSubscriptions(search1$.subscriptions).toBe(expSub1);
        expectSubscriptions(search2$.subscriptions).toBe(expSub2);
      }
    );
  });

  it('should ignore search function failure.', () => {

    testScheduler.run(
      ({cold, time, expectObservable}) => {
        const source = '  -a---|';
        const debounce = ' -|';
        const expected = '-----|';
        const source$ = cold(source);
        const debTime = time(debounce);

        const actual$ = source$.pipe(autocomplete(debTime, () => {
          throw new Error('Search function error');
        }));

        expectObservable(actual$).toBe(expected, {z: 'output'});
      }
    );
  });

  it('should ignore inner observable failure.', () => {

    testScheduler.run(
      ({cold, time, expectObservable, expectSubscriptions}) => {
        const source = '  -a---|';
        const debounce = ' -|';
        const search = '    -#';
        const expected = '-----|';
        const expSub = '  --^!';
        const source$ = cold(source);
        const search$ = cold(search, {}, new Error('Inner observable error'));
        const debTime = time(debounce);

        const actual$ = source$.pipe(autocomplete(debTime, () => search$));

        expectObservable(actual$).toBe(expected, {z: 'output'});
        expectSubscriptions(search$.subscriptions).toBe(expSub);
      }
    );
  });

});
