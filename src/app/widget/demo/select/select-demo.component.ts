import { Component } from '@angular/core';
import { GroupOption } from '../../../exports/select/select.component';

@Component({
  selector: 'hi-select-demo',
  templateUrl: './select-demo.template.html'
})
export class SelectDemoComponent {
  options = ['Tyler', 'Lucy', 'Jack'];
  selectValue = 'Jack';
  objOptions = this.options.map((label, id) => ({
    id, label
  }));
  selectObjValue = this.objOptions[2];
  selectGroupValue: any;
  groupOptions: GroupOption[] = [
    {
      group: 'Manager',
      options: ['Tyler']
    },
    {
      group: 'Engineer',
      options: ['Lucy', 'Jack']
    }
  ]
  ;
}
