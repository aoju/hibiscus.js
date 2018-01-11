import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {TagsDemoComponent} from './tags-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [TagsDemoComponent],
  declarations: [TagsDemoComponent],
  providers: [],
  entryComponents: [TagsDemoComponent]
})
export class TagsDemoModule {
}
