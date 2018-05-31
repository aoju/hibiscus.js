import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {MessageDemoComponent} from './message-demo.component'

@NgModule({
  imports: [CommonModule, HiNGModule, FormsModule],
  exports: [MessageDemoComponent],
  declarations: [MessageDemoComponent],
  providers: [],
  entryComponents: [MessageDemoComponent]
})
export class MessageDemoModule {
}
