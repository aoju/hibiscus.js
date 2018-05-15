import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TooltipComponent} from './tooltip.component';
import {TooltipDirective} from './tooltip.directive';

@NgModule({
  declarations: [TooltipComponent, TooltipDirective],
  exports: [TooltipComponent, TooltipDirective],
  imports: [CommonModule, OverlayModule],
  entryComponents: [TooltipComponent]
})
export class TooltipModule {
}
