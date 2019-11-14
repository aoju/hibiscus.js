import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {AccordionDemoComponent} from './accordion-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [AccordionDemoComponent],
  declarations: [AccordionDemoComponent],
  providers: [],
  entryComponents: [AccordionDemoComponent]
})
export class AccordionDemoModule {
}
