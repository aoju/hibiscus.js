import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HiNGModule} from '../../../exports';
import {DraggableDemoComponent} from './draggable-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule],
  exports: [DraggableDemoComponent],
  declarations: [DraggableDemoComponent],
  providers: [],
  entryComponents: [DraggableDemoComponent]
})
export class DraggableDemoModule {
}
