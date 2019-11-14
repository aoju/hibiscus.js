import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {InfiniteScrollDemoComponent} from './infinite-scroll-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [InfiniteScrollDemoComponent],
  declarations: [InfiniteScrollDemoComponent],
  providers: [],
  entryComponents: [InfiniteScrollDemoComponent]
})
export class InfiniteScrollDemoModule {
}
