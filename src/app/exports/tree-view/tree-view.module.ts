import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TreeViewComponent} from './tree-view.component';
import {TreeNodeComponent} from './tree-node.component';
import {CheckboxGroupModule} from '../checkbox-group';
import {FormsModule} from '@angular/forms';
import {DraggableModule} from '../draggable';
import {TreePanelComponent} from './tree-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckboxGroupModule,
    DraggableModule
  ],
  exports: [
    TreeViewComponent,
    TreeNodeComponent,
    TreePanelComponent
  ],
  declarations: [
    TreeViewComponent,
    TreeNodeComponent,
    TreePanelComponent
  ]
})
export class TreeViewModule {
}
