import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {NotifyDemoComponent} from './notify-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [NotifyDemoComponent],
  declarations: [NotifyDemoComponent],
  providers: [],
  entryComponents: [NotifyDemoComponent]
})
export class NotifyDemoModule {
}
