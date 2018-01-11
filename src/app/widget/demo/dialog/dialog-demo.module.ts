import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {DialogDemoComponent} from './dialog-demo.component';

@NgModule({
  imports: [ReactiveFormsModule, HiNGModule],
  declarations: [DialogDemoComponent],
  exports: [DialogDemoComponent],
  providers: [],
  entryComponents: [DialogDemoComponent]
})
export class DialogDemoModule {
}
