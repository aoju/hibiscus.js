import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataTable} from './data-table.directive';
import {DataSort, BootstrapPaginator, Paginator} from './data-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataTable,
    DataSort,
    Paginator,
    BootstrapPaginator
  ],
  exports: [
    DataTable,
    DataSort,
    Paginator,
    BootstrapPaginator
  ]
})
export class DataTableModule {

}
