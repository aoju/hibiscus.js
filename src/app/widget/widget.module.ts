import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {RoutesModule} from './widget.routes';
import {DemoModule} from './demo/demo.module';

@NgModule({
  imports: [
    SharedModule,
    DemoModule,
    RoutesModule
  ]
})
export class WidgetModule {

}
