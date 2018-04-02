import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputGroupComponent} from './input-group.component';
import {InputDirective} from './input.directive';

@NgModule({
  declarations: [InputDirective, InputGroupComponent],
  exports: [InputDirective, InputGroupComponent],
  imports: [CommonModule, FormsModule]
})
export class InputModule {
}
