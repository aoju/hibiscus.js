import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[hiSlide]',
})
export class SlideDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }

}
