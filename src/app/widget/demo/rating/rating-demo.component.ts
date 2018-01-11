import {Component} from '@angular/core';

@Component({
  selector: 'hi-rating-demo',
  templateUrl: './rating-demo.template.html'
})
export class RatingDemoComponent {
  disabled = false;
  rating: any = {
    value: 3,
    max: 10
  };
  icons = {stateOn: 'icmn-heart', stateOff: 'icmn-cancel-circle'};

}
