import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { HiPopconfirmComponent } from './hi-popconfirm.component';
import { HiPopconfirmDirective } from './hi-popconfirm.directive';

@NgModule({
  declarations: [ HiPopconfirmComponent, HiPopconfirmDirective ],
  exports     : [ HiPopconfirmComponent, HiPopconfirmDirective ],
  imports     : [ CommonModule, OverlayModule]
})

export class HiPopconfirmModule {
}
