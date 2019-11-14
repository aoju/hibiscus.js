import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {SelectButtonDemoComponent} from './select-button-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [SelectButtonDemoComponent],
  declarations: [SelectButtonDemoComponent],
  providers: [SelectButtonDemoComponent],
  entryComponents: [SelectButtonDemoComponent]
})
export class SelectButtonDemoModule {
}
