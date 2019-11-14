import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {HiNGModule} from '../../../exports';
import {SwitchDemoComponent} from './switch-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [SwitchDemoComponent],
  declarations: [SwitchDemoComponent],
  providers: [],
  entryComponents: [SwitchDemoComponent]
})
export class SwitchDemoModule {
}
