import {Directive, Input, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[hiAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {

  @Input('hiAutoFocus') autoFocus: boolean;

  constructor(private  elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.autoFocus && this.elementRef.nativeElement.focus) {
      this.elementRef.nativeElement.focus();
    }
  }
}
