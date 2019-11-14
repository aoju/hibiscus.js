import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {FlowStepDemoComponent} from './flow-step-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [FlowStepDemoComponent],
  declarations: [FlowStepDemoComponent],
  providers: [],
  entryComponents: [FlowStepDemoComponent]
})
export class FlowStepDemoModule {
}
