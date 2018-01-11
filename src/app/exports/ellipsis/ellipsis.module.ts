import {NgModule} from '@angular/core';

import {EllipsisComponent} from './ellipsis.component';
import {CommonModule} from '@angular/common';
import {TooltipModule} from '../tooltip';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule
  ],
  declarations: [
    EllipsisComponent
  ],
  exports: [
    EllipsisComponent
  ]
})
export class EllipsisModule {
}
