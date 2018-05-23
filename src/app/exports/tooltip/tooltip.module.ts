import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolTipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations   : [ ToolTipComponent, TooltipDirective ],
  exports        : [ ToolTipComponent, TooltipDirective ],
  imports        : [ CommonModule, OverlayModule ],
  entryComponents: [ ToolTipComponent ]
})
export class TooltipModule {
}
