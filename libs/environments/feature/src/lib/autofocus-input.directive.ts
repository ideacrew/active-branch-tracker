import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[idcAutofocusInput]',
})
export class AutofocusInputDirective implements AfterContentInit {
  @Input() readonly autoFocus: boolean = false;

  constructor(private element: ElementRef<HTMLInputElement>) {}

  ngAfterContentInit(): void {
    setTimeout(() => void this.element.nativeElement?.focus(), 250);
  }
}
