import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {CarouselDemoComponent} from './carousel-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [CarouselDemoComponent],
  declarations: [CarouselDemoComponent],
  providers: [],
  entryComponents: [CarouselDemoComponent]
})
export class CarouselDemoModule {
}
