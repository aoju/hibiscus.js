import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FramesComponent} from './frames.component';

import {SharedModule} from '../shared/shared.module';
import {DemoService} from '../widget/demo/demo.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: [
    DemoService
  ],
  declarations: [
    FramesComponent
  ]
})
export class FramesModule {

}
