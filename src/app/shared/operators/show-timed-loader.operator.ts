import { Observable, timer, combineLatest, merge } from 'rxjs';
import {
  distinctUntilChanged,
  mapTo,
  startWith,
  takeUntil,
} from 'rxjs/operators';

/**
 * Returns an operator fnc that subscribes to source observable and
 * emits a boolean value indicating whether to show or hide a loader
 *
 * @remarks
 * This custom operator emits a value of `true` if source Observable takes longer to emit a value than `loaderDelay`.
 * Otherwise, if the source Observable emits earlier than `loaderDelay` then it emits a value of `false`
 * w/c indicates that we hide the loader.
 *
 * true - loaderDelay emits before source Observable emits
 * false - source Observable finally emits a value
 *
 *
 * @param loaderDelay - time in `ms` to wait before showing the loader
 * @param timeAfterLoaderDelay - time in `ms` to add to `loaderDelay` to indicate a guaranteed delay between showing the loader and hiding it
 * @returns OperatorFnc
 *
 */
export const showTimedLoader = <T>(
  loaderDelay: number,
  timeAfterLoaderDelay: number
) => {
  return (source: Observable<T>): Observable<boolean> => {
    const obs$ = new Observable<boolean>(subscriber => {
      const loader$ = timer(loaderDelay).pipe(takeUntil(source), mapTo(true));

      const result$ = combineLatest([
        source,
        timer(loaderDelay + timeAfterLoaderDelay),
      ]).pipe(mapTo(false));

      return merge(loader$, result$)
        .pipe(startWith(false), distinctUntilChanged())
        .subscribe({
          next: value => {
            subscriber.next(value);
          },
          error: err => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
    });

    return obs$;
  };
};
