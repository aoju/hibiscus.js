import {NgModule} from '@angular/core';

import {AlertBoxComponent} from './alert-box.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AlertBoxComponent
  ],
  declarations: [
    AlertBoxComponent
  ]
})
export class AlertBoxModule {
}
