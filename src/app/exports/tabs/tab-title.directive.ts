import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[hiTabTitle]',
})
export class TabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
