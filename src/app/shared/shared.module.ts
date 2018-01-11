import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HiNGModule} from '../exports';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HiNGModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HiNGModule
  ]
})
export class SharedModule {

}
