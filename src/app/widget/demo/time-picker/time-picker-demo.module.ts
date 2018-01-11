import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {FormsModule} from '@angular/forms';
import {TimePickerDemoComponent} from './time-picker-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [TimePickerDemoComponent],
  declarations: [TimePickerDemoComponent],
  providers: [],
  entryComponents: [TimePickerDemoComponent]
})
export class TimePickerDemoModule {
}

