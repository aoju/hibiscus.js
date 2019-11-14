import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[hiTabContent]',
})
export class TabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
