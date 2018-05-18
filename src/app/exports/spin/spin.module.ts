import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinComponent } from './spin.component';

@NgModule({
  exports     : [ SpinComponent ],
  declarations: [ SpinComponent ],
  imports     : [ CommonModule, ObserversModule ]
})
export class SpinModule {
}
