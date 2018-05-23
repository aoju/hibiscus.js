/**
 * Created by chenlei on 2018/3/28.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {HiDemoSelectBasicComponent} from './hiselect-basic.component';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HiNGModule
  ],
  declarations: [
    HiDemoSelectBasicComponent
  ],
  exports: [
    HiDemoSelectBasicComponent
  ],
  entryComponents: [HiDemoSelectBasicComponent]
})
export class HiSelectDemoModule {
}

