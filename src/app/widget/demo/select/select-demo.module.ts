import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectDemoComponent} from './select-demo.component';
import {HiNGModule} from '../../../exports';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HiNGModule
  ],
  exports: [
    SelectDemoComponent
  ],
  declarations: [SelectDemoComponent],
  providers: [],
  entryComponents: [SelectDemoComponent]
})
export class SelectDemoModule {
}
