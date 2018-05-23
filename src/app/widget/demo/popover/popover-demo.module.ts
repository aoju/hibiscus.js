import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {PopoverDemoComponent} from './popover-demo.component'

@NgModule({
  imports: [CommonModule, HiNGModule, FormsModule],
  exports: [PopoverDemoComponent],
  declarations: [PopoverDemoComponent],
  providers: [],
  entryComponents: [PopoverDemoComponent]
})
export class PopoverDemoModule {
}
