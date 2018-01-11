import {Component} from '@angular/core';
import {TimePickerModel} from '../../../exports';

@Component({
  selector: 'hi-time-picker-demo',
  templateUrl: './time-picker-demo.template.html'
})
export class TimePickerDemoComponent {

  time1 = new TimePickerModel(13, 30, 30);
  time2 = new TimePickerModel(13, 30);
  time3 = new TimePickerModel(13, 30, 30);
  disabled: boolean;

  timeChange(time) {
    console.log('time change:', time, time.toString());
  }
}
