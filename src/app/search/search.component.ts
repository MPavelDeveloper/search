import {Component, OnInit} from '@angular/core';
import {DataProviderService} from "../services/data-provider.service";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public filtersVisible: boolean;
  public editHintVisible: boolean
  public terms: Array<string>;
  private dataService: DataProviderService;

  constructor(dataService: DataProviderService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.terms = this.dataService.getData();
    this.filtersVisible = false;
  }

  public deleteTerm(index: number): void {
    this.terms.splice(index, 1);
  }

  public filtersToggle(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  public editDetailsToggle(event: Event): void {
    (event.type === 'mouseenter') ? this.editHintVisible = true : this.editHintVisible = false;
  }
}
