import {Injectable} from '@angular/core';
import {TEST_FILTERS} from '../testData';
import {
  debounceTime, distinctUntilChanged,
  filter, Observable, switchMap,
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public filters: Array<string>;
  public filters$: Observable<string>;

  constructor() {
    this.filters = this.getData();
    this.filters$ = new Observable(subscriber => subscriber.next());
  }

  private getData(): Array<string> {
    return TEST_FILTERS;
  }

  public findFilters(term: string): Array<string> {
    const filters = [];
    for (let filter of this.filters) {
      if (filter.startsWith(term)) {
        filters.push(filter);
      }
    }
    return filters;
  }

  public find(term: string) {
    return this.filters$.pipe(
      debounceTime(1200),
      distinctUntilChanged(),
      switchMap(() => this.filters),
      filter((filt) => filt.startsWith(term)),
    )
  }
}
