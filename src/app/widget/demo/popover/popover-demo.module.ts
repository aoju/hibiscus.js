import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {PopoverDemoComponent} from './popover-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [PopoverDemoComponent],
  declarations: [PopoverDemoComponent],
  providers: [],
  entryComponents: [PopoverDemoComponent]
})
export class PopoverDemoModule {
}
