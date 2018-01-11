import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {TabsDemoComponent} from './tabs-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [TabsDemoComponent],
  declarations: [TabsDemoComponent],
  providers: [],
  entryComponents: [TabsDemoComponent]
})
export class TabsDemoModule {
}
