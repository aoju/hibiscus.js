/**
 * Created by chenlei on 2018/3/28.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NzCascaderModule} from '../../../exports';
import { CascaderBasicComponent } from './cascader.component';

@NgModule({
    imports     : [
        CommonModule ,
        FormsModule,
        NzCascaderModule
    ],
    declarations: [
        CascaderBasicComponent
    ],
    exports     : [
        CascaderBasicComponent
    ]
})
export class CascaderModule {
}
