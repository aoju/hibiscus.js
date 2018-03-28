import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LinkageComponent} from './linkage.component';
import {LinkagePipe} from './linkage.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LinkageComponent
  ],
  declarations: [
    LinkageComponent,
    LinkagePipe
  ]
})
export class LinkageModule {

}
