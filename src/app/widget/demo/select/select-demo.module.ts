import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {SelectDemoComponent} from './select-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HiNGModule
  ],
  declarations: [
    SelectDemoComponent
  ],
  exports: [
    SelectDemoComponent
  ],
  entryComponents: [SelectDemoComponent]
})
export class SelectDemoModule {
}

