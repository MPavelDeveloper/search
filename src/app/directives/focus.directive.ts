import { AfterContentInit, Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[autoFocus]"
})
export class FocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean;

  public constructor(private el: ElementRef) {}

  public ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 100);
  }
}
