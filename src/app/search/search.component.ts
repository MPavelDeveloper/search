import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {DataProviderService} from '../services/data-provider.service';
import {TEST_FILTERS} from '../testData';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() title: string;
  @Input() searchResult: Array<string>;
  @Output() searchTerms: Array<string>;
  @Output() term = new EventEmitter<string>();

  public viewMode: boolean;
  public editHintVisible: boolean
  public terms: Array<string>;
  private dataService: DataProviderService;

  constructor(dataService: DataProviderService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.searchResult = [];
    this.terms = [].concat(TEST_FILTERS);
    this.viewMode = true;
  }

  public deleteTerm(index: number): void {
    this.terms.splice(index, 1);
  }

  public viewEditToggle(): void {
    this.viewMode = !this.viewMode;
  }

  public editHintToggle(event: Event): void {
    (event.type === 'mouseenter') ? this.editHintVisible = true : this.editHintVisible = false;
  }

  public emitSearchTerms(term: string): void {
    if (term.trim()) {
      this.term.emit(term.trim());
    } else {
      this.cleanSearchResult()
    }
  }

  public cleanSearchResult(): void {
    this.searchResult = []
  }
}
