import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {PaginationDemoComponent} from './pagination-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  declarations: [PaginationDemoComponent],
  exports: [PaginationDemoComponent],
  providers: [],
  entryComponents: [PaginationDemoComponent]
})
export class PaginationDemoModule {

}
