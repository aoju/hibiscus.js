import {Component} from '@angular/core';

@Component({
  selector: 'hi-spin-demo',
  templateUrl: './spin-demo.template.html',
  styles: [
      `hi-spin {
      display: inline-block;
      margin-right: 16px;
    }

    .example {
      text-align: center;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 30px 50px;
      margin: 20px 0;
    }
    `]
})
export class SpinDemoComponent {
  
}
