import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {SpinDemoComponent} from './spin-demo.component'

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [SpinDemoComponent],
  declarations: [SpinDemoComponent],
  providers: [],
  entryComponents: [SpinDemoComponent]
})
export class SpinDemoModule {
}
