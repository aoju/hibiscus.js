import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SelectDropdown} from './select.dropdown';
import {SelectOption} from './select.option';
import {SelectComponent, SELECTION_MODEL_FACTORY} from './select.component';
import {NgFooterTemplateDirective, NgHeaderTemplateDirective, NgItemLabelDirective, NgLabelTemplateDirective, NgLoadingSpinnerTemplateDirective, NgLoadingTextTemplateDirective, NgMultiLabelTemplateDirective, NgNotFoundTemplateDirective, NgOptgroupTemplateDirective, NgOptionTemplateDirective, NgTagTemplateDirective, NgTypeToSearchTemplateDirective} from './select.directive';
import {DefaultSelectionModelFactory} from './select.model';

@NgModule({
  declarations: [
    SelectDropdown,
    SelectOption,
    SelectComponent,
    NgOptgroupTemplateDirective,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    NgMultiLabelTemplateDirective,
    NgHeaderTemplateDirective,
    NgFooterTemplateDirective,
    NgNotFoundTemplateDirective,
    NgTypeToSearchTemplateDirective,
    NgLoadingTextTemplateDirective,
    NgTagTemplateDirective,
    NgLoadingSpinnerTemplateDirective,
    NgItemLabelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectComponent,
    SelectOption,
    NgOptgroupTemplateDirective,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    NgMultiLabelTemplateDirective,
    NgHeaderTemplateDirective,
    NgFooterTemplateDirective,
    NgNotFoundTemplateDirective,
    NgTypeToSearchTemplateDirective,
    NgLoadingTextTemplateDirective,
    NgTagTemplateDirective,
    NgLoadingSpinnerTemplateDirective
  ],
  providers: [
    {provide: SELECTION_MODEL_FACTORY, useValue: DefaultSelectionModelFactory}
  ]
})
export class SelectModule {
}
