import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {PopconfirmDemoComponent} from './popconfirm-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [PopconfirmDemoComponent],
  declarations: [PopconfirmDemoComponent],
  providers: [],
  entryComponents: [PopconfirmDemoComponent]
})
export class PopconfirmDemoModule {
}
