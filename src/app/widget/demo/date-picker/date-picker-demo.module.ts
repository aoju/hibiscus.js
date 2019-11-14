import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {DatePickerDemoComponent} from './date-picker-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [DatePickerDemoComponent],
  declarations: [DatePickerDemoComponent],
  providers: [],
  entryComponents: [DatePickerDemoComponent]
})
export class DatePickerDemoModule {
}
