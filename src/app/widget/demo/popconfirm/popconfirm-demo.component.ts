import {Component} from '@angular/core';

@Component({
  selector: 'hi-popconfirm-demo',
  templateUrl: './popconfirm-demo.template.html',
  styles  : [
      `button {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class PopconfirmDemoComponent {
  cancel(): void {
    console.log('click cancel');
  }

  confirm(): void {
    console.log('click confirm');
  }
}
