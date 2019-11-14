import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {AlertBoxDemoComponent} from './alert-box-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  declarations: [AlertBoxDemoComponent],
  exports: [AlertBoxDemoComponent],
  providers: [],
  entryComponents: [AlertBoxDemoComponent]

})
export class AlertBoxDemoModule {
}
