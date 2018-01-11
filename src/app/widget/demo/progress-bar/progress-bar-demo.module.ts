import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {ProgressBarDemoComponent} from './progress-bar-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [ProgressBarDemoComponent],
  declarations: [ProgressBarDemoComponent],
  providers: [],
  entryComponents: [ProgressBarDemoComponent]
})
export class ProgressBarDemoModule {
}
