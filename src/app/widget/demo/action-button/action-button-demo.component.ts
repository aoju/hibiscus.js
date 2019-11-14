import {Component} from '@angular/core';
import {ActionItem} from '../../../exports';

@Component({
  selector: 'hi-action-button-demo',
  templateUrl: './action-button-demo.template.html'
})
export class ActionButtonDemoComponent {
  isActionOpen: boolean;
  disabledActionOpen = true;
  actions: ActionItem[] = [
    {
      text: 'Action Header',
      header: true
    },
    {
      id: 1,
      text: 'Save',
      icon: 'icmn-floppy-disk'
    }, {
      id: 2,
      text: 'Refresh',
      icon: 'icmn-loop2'
    },
    {
      divider: true
    },
    {
      id: 3,
      text: 'Remove',
      icon: 'icmn-remove'
    }];

  onActionClick(item: ActionItem) {
    console.log(`Action item ${item.id} clicked`, item);
  }
}
