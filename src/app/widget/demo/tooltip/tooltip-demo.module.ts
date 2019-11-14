import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {TooltipDemoComponent} from './tooltip-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [TooltipDemoComponent],
  declarations: [TooltipDemoComponent],
  providers: [],
  entryComponents: [TooltipDemoComponent]
})
export class TooltipDemoModule {
}
