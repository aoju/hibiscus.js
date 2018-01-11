import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {CheckboxGroupDemoComponent} from './checkbox-group-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [CheckboxGroupDemoComponent],
  declarations: [CheckboxGroupDemoComponent],
  providers: [],
  entryComponents: [CheckboxGroupDemoComponent]
})
export class CheckboxGroupDemoModule {
}
