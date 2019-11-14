import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {RatingDemoComponent} from './rating-demo.component';

@NgModule({
  imports: [CommonModule, FormsModule, HiNGModule],
  exports: [RatingDemoComponent],
  declarations: [RatingDemoComponent],
  providers: [],
  entryComponents: [RatingDemoComponent]
})
export class RatingDemoModule {
}
