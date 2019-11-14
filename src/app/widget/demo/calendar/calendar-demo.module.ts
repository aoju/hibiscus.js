import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {CalendarDemoComponent} from './calendar-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [CalendarDemoComponent],
  declarations: [CalendarDemoComponent],
  providers: [],
  entryComponents: [CalendarDemoComponent]
})
export class CalendarDemoModule {
}
