import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkageDemoComponent} from './linkage-demo.component';
import {HiNGModule} from '../../../exports';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HiNGModule,
    HttpModule
  ],
  exports: [
    LinkageDemoComponent
  ],
  declarations: [LinkageDemoComponent],
  providers: [],
  entryComponents: [LinkageDemoComponent]
})
export class LinkageDemoModule {
}
