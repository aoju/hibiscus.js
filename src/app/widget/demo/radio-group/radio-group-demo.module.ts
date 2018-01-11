import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {RadioGroupDemoComponent} from './radio-group-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [RadioGroupDemoComponent],
  declarations: [RadioGroupDemoComponent],
  providers: [],
  entryComponents: [RadioGroupDemoComponent]
})
export class RadioGroupDemoModule {
}
