import {Injectable} from '@angular/core';
import {TEST_DATA, TEST_FILTERS} from '../testData';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public filters: Array<string>;

  constructor() {
    this.filters = this.getData()
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
}
