import {Component, ChangeDetectionStrategy} from '@angular/core';
import {SelectButtonItem} from '../../../exports';

@Component({
  selector: 'hi-select-button-demo',
  templateUrl: './select-button-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectButtonDemoComponent {
  value: string;
  multipleValue: string[];
  disabled = true;
  items: SelectButtonItem[] = [
    {
      text: 'Left'
    },
    {
      text: 'Middle'
    },
    {
      text: 'Right'
    }
  ];

}
