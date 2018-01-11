import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {BadgeDemoComponent} from './badge-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [BadgeDemoComponent],
  declarations: [BadgeDemoComponent],
  providers: [],
  entryComponents: [BadgeDemoComponent]
})
export class BadgeDemoModule {
}
