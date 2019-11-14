import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  entryComponents: [ PopoverComponent ],
  exports        : [ PopoverDirective, PopoverComponent ],
  declarations   : [ PopoverDirective, PopoverComponent ],
  imports        : [ CommonModule, OverlayModule ]
})

export class PopoverModule {
}
