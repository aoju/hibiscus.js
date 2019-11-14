import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {BreadcrumbsDemoComponent} from './breadcrumbs-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [BreadcrumbsDemoComponent],
  declarations: [BreadcrumbsDemoComponent],
  providers: [],
  entryComponents: [BreadcrumbsDemoComponent]
})
export class BreadcrumbsDemoModule {
}
