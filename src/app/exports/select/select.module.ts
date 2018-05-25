/**
 * Created by chenlei on 2018/5/22.
 */
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {OptionContainerComponent} from './option-container.component';
import {ContainerPipe} from './option-container.pipe';
import {OptionGroupComponent} from './option-group.component';
import {OptionLiComponent} from './option-li.component';
import {OptionComponent} from './option.component';
import {OptionPipe, SubOptionPipe} from './option.pipe';
import {SelectTopControlComponent} from './select-top-control.component';
import {SelectUnselectableDirective} from './select-unselectable.directive';
import {SelectComponent} from './select.component';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule],
  declarations: [OptionComponent, SelectComponent, OptionContainerComponent, OptionGroupComponent,
    OptionLiComponent, SelectTopControlComponent, SelectUnselectableDirective, ContainerPipe, OptionPipe, SubOptionPipe],
  exports: [OptionComponent, SelectComponent, OptionContainerComponent, OptionGroupComponent, SelectTopControlComponent]
})
export class SelectModule {
}
