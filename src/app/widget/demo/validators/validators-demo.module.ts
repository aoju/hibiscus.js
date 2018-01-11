import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {ValidatorsDemoComponent} from './validators-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [ValidatorsDemoComponent],
  declarations: [ValidatorsDemoComponent],
  providers: [ValidatorsDemoComponent],
  entryComponents: [ValidatorsDemoComponent]
})
export class ValidatorsDemoModule {
}
