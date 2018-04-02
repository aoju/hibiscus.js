import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputModule} from '../input/input.module';
import {CascaderComponent} from './cascader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    InputModule
  ],
  declarations: [
    CascaderComponent
  ],
  exports: [
    CascaderComponent
  ]
})
export class CascaderModule {

}
