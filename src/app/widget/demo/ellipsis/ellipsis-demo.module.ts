import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {EllipsisDemoComponent} from './ellipsis-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [EllipsisDemoComponent],
  declarations: [EllipsisDemoComponent],
  providers: [],
  entryComponents: [EllipsisDemoComponent]
})
export class EllipsisDemoModule {
}
