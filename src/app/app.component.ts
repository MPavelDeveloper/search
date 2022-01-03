import {Component} from '@angular/core';
import {DataProviderService} from './services/data-provider.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public filters: Array<string>;
  private dataProvider: DataProviderService;
  private filters$: Subscription;

  constructor(dataProvider: DataProviderService) {
    this.dataProvider = dataProvider;
  }

  public termHandler(term: string): void {
    this.filters = this.dataProvider.findFilters(term);
    this.dataProvider.find(term).subscribe(filter =>
      console.log(filter)
    );
  }
}
