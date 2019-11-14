import {Component} from '@angular/core';

@Component({
  selector: 'hi-validators-demo',
  templateUrl: './validators-demo.template.html'
})
export class ValidatorsDemoComponent {
  model: any = {};
  date = Date.parse('2017-05-01');
  today = new Date().setHours(0, 0, 0, 0);
}
