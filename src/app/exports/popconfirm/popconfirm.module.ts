import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { PopconfirmComponent } from './popconfirm.component';
import { PopconfirmDirective } from './popconfirm.directive';

@NgModule({
  declarations: [ PopconfirmComponent, PopconfirmDirective ],
  exports     : [ PopconfirmComponent, PopconfirmDirective ],
  imports     : [ CommonModule, OverlayModule]
})

export class PopconfirmModule {
}
