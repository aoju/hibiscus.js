import {NgModule} from '@angular/core';

import {AutoFocusDirective} from './directive/auto-focus.directive';
import {CommonModule} from '@angular/common';
import {TemplateLoaderComponent} from './template-loader.component';
import {TrustHtmlPipe} from './pipe/trust-html.pipe';
import {ResizeableDirective} from './directive/resizeable.directive';
import {DropdownDirective} from './directive/dropdown.directive';
import {DatePipe} from './pipe/date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AutoFocusDirective,
    TemplateLoaderComponent,
    TrustHtmlPipe,
    ResizeableDirective,
    DropdownDirective,
    DatePipe
  ],
  declarations: [
    AutoFocusDirective,
    TemplateLoaderComponent,
    TrustHtmlPipe,
    ResizeableDirective,
    DropdownDirective,
    DatePipe
  ]
})
export class HiCommonModule {
}
