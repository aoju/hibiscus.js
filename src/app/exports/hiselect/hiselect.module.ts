/**
 * Created by chenlei on 2018/5/22.
 */
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HiOptionContainerComponent} from './hi-option-container.component';
import {HiContainerPipe} from './hi-option-container.pipe';
import {HiOptionGroupComponent} from './hi-option-group.component';
import {HiOptionLiComponent} from './hi-option-li.component';
import {HiOptionComponent} from './hi-option.component';
import {HiOptionPipe, HiSubOptionPipe} from './hi-option.pipe';
import {HiSelectTopControlComponent} from './hi-select-top-control.component';
import {HiSelectUnselectableDirective} from './hi-select-unselectable.directive';
import {HiSelectComponent} from './hiselect.component';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule],
  declarations: [HiOptionComponent, HiSelectComponent, HiOptionContainerComponent, HiOptionGroupComponent, HiOptionLiComponent, HiSelectTopControlComponent, HiSelectUnselectableDirective, HiContainerPipe, HiOptionPipe, HiSubOptionPipe],
  exports: [HiOptionComponent, HiSelectComponent, HiOptionContainerComponent, HiOptionGroupComponent, HiSelectTopControlComponent]
})
export class HiSelectModule {
}
