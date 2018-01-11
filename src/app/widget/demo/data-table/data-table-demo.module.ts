import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {DataTableDemoComponent} from './data-table-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [DataTableDemoComponent],
  declarations: [DataTableDemoComponent],
  providers: [],
  entryComponents: [DataTableDemoComponent]
})
export class DataTableDemoModule {
}
