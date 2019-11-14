import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {GuideRoutesModule} from './guide.routes';
import {GuideComponent} from './guide.component';

@NgModule({
  imports: [
    SharedModule,
    GuideRoutesModule
  ],
  declarations: [
    GuideComponent
  ],
})
export class GuideModule {

}
