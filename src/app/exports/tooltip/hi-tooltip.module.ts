import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HiToolTipComponent } from './hi-tooltip.component';
import { HiTooltipDirective } from './hi-tooltip.directive';

@NgModule({
  declarations   : [ HiToolTipComponent, HiTooltipDirective ],
  exports        : [ HiToolTipComponent, HiTooltipDirective ],
  imports        : [ CommonModule, OverlayModule ],
  entryComponents: [ HiToolTipComponent ]
})
export class TooltipModule {
}
