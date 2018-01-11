import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {ActionButtonDemoComponent} from './action-button-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [ActionButtonDemoComponent],
  declarations: [ActionButtonDemoComponent],
  providers: [],
  entryComponents: [ActionButtonDemoComponent]
})
export class ActionButtonDemoModule {
}
