import {TestScheduler} from "rxjs/testing";
import {auditMap} from "./audit-map.utils";

describe('auditMap', () => {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  })

  it('should pick last value when multiple inputs are propagated.', () => {
    testScheduler.run(
      ({cold, expectObservable, expectSubscriptions}) => {
        const source = '  -abc|';
        const inner = '    ---z|';
        //                     ---z|;
        const expected = '----z---z|'
        const expSub1 = ' -^---!';
        const expSub2 = ' -----^---!';

        const source$ = cold(source);
        const inner$ = cold(inner);

        const actual$ = source$.pipe(auditMap(() => inner$));

        expectObservable(actual$).toBe(expected);
        expectSubscriptions(inner$.subscriptions).toBe([expSub1, expSub2]);
      }
    );
  });
  it('should work even if inner observable completes without emitting.', () => {
    testScheduler.run(
      ({cold, expectObservable, expectSubscriptions}) => {
        const source = '  -abc|';
        const inner = '    ----|';
        //                     ----|;
        const expected = '---------|'
        const expSub1 = ' -^---!';
        const expSub2 = ' -----^---!';

        // Here b is skipped
        const source$ = cold(source);
        const inner$ = cold(inner);

        const actual$ = source$.pipe(auditMap(() => inner$));

        expectObservable(actual$).toBe(expected);
        expectSubscriptions(inner$.subscriptions).toBe([expSub1, expSub2]);
      }
    );
  })
  it('should work properly even if values are emitted synchronously.', () => {
    testScheduler.run(
      ({cold, expectObservable, expectSubscriptions}) => {
        const source = '  -(abc)|';
        const inner = '     ---z|';
        //                      ---z|
        const expected = '- ---z---z|';
        const expSub1 = ' - ^---!';
        const expSub2 = ' - ----^---!';

        // Here b is skipped
        const source$ = cold(source);
        const inner$ = cold(inner);

        const actual$ = source$.pipe(auditMap(() => inner$));

        expectObservable(actual$).toBe(expected);
        expectSubscriptions(inner$.subscriptions).toBe([expSub1, expSub2]);
      }
    );
  })

});
