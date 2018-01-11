import {Component} from '@angular/core';

@Component({
  selector: 'hi-radio-group-demo',
  templateUrl: './radio-group-demo.template.html'
})
export class RadioGroupDemoComponent {

  sexOptions = ['male', 'female'];
  sex: string;

  seasonOptions = [
    {label: 'Spring', value: 'SPRING'},
    {label: 'Summer', value: 'SUMMER'},
    {label: 'Autumn', value: 'AUTUMN'},
    {label: 'Winter', value: 'WINTER'}
  ];

  season = this.seasonOptions[1];
  seasonValue: string;
  valueParser = (item) => item.value;
}

