import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderDemoComponent} from './slider-demo.component';
import {HiNGModule} from '../../../exports';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    HiNGModule,
    FormsModule
  ],
  exports: [
    SliderDemoComponent
  ],
  declarations: [SliderDemoComponent],
  providers: [],
  entryComponents: [SliderDemoComponent]
})
export class SliderDemoModule {
}
