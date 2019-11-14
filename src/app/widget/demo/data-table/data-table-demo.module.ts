import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {DataFilterPipe} from './data-filter.pipe';
import {DataTableDemoComponent} from './data-table-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [DataTableDemoComponent],
  declarations: [DataFilterPipe, DataTableDemoComponent],
  providers: [],
  entryComponents: [DataTableDemoComponent]
})
export class DataTableDemoModule {
}
