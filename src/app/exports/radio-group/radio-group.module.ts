import {NgModule} from '@angular/core';

import {RadioGroupComponent} from './radio-group.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RadioGroupComponent
  ],
  exports: [
    RadioGroupComponent
  ],
})
export class RadioGroupModule {
}
