import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HiNGModule} from '../../../exports';
import {TreeViewDemoComponent} from './tree-view-demo.component';

@NgModule({
  imports: [CommonModule, HiNGModule, FormsModule],
  exports: [TreeViewDemoComponent],
  declarations: [TreeViewDemoComponent],
  providers: [],
  entryComponents: [TreeViewDemoComponent]
})
export class TreeViewDemoModule {
}
