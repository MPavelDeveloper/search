import {Component, Input, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef} from '@angular/core';
import {DataProviderService} from '../services/data-provider.service';
import {TEST_FILTERS} from '../testData';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  host: {'(document:click)' : 'onDocumentClickHandler($event.target)'}
})
export class SearchComponent implements OnInit {
  @Input() title: string;
  @Input() searchTermResult: Array<string>;
  @Output() searchTerms: Array<string>;
  @Output() term = new EventEmitter<string>();
  @ViewChild('editTermsWrap') editTermsWrap: ElementRef;
  public terms: Array<string>;
  public viewMode: boolean;
  public editHintVisible: boolean
  private dataService: DataProviderService;

  constructor(dataService: DataProviderService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.searchTermResult = [];
    this.terms = [...TEST_FILTERS];
    this.viewMode = true;
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
    this.searchTermResult = []
  }

  public isChecked(term: string): boolean {
    return this.terms.includes(term);
  }

  public termHandler(termCheckBox: HTMLInputElement): void {
    if (termCheckBox.checked) {
      this.terms.push(termCheckBox.value);
    } else {
      this.deleteTerm(termCheckBox.value)
    }
  }

  public deleteTerm(term: string): void {
    let index = this.terms.findIndex(currentTerm => currentTerm === term);
    if (index > -1) {
      this.terms.splice(index, 1);
    }
  }

  private onDocumentClickHandler(target: Element): void {
    if (this.editTermsWrap && target.contains(this.editTermsWrap.nativeElement)) {
      this.viewEditToggle();
      this.cleanSearchResult();
    }
  }

}
