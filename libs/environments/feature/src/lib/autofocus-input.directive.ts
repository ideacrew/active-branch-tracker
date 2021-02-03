import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[idcAutofocusInput]',
})
export class AutofocusInputDirective implements AfterContentInit {
  @Input() readonly autoFocus: boolean;
  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    setTimeout(() => this.el.nativeElement.focus(), 250);
  }
}
