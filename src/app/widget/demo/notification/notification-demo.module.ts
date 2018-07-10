import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {NotificationDemoComponent} from './notification-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule, FormsModule],
  exports: [NotificationDemoComponent],
  declarations: [NotificationDemoComponent],
  providers: [],
  entryComponents: [NotificationDemoComponent]
})
export class NotificationDemoModule {
}
