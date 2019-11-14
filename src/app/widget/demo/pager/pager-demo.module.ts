import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagerModule} from '../../../exports';
import {PagerDemoComponent} from './pager-demo.component';

@NgModule({
  imports: [CommonModule, PagerModule],
  declarations: [PagerDemoComponent],
  exports: [PagerDemoComponent],
  providers: [],
  entryComponents: [PagerDemoComponent]

})
export class PagerDemoModule {
}
