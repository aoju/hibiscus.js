import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion.component';
import {AccordionItemComponent} from './accordion-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent
  ],
  declarations: [
    AccordionComponent,
    AccordionItemComponent
  ]
})
export class AccordionModule {
}
