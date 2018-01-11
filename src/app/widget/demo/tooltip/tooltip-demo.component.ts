import {Component} from '@angular/core';

@Component({
  selector: 'hi-tooltip-demo',
  templateUrl: './tooltip-demo.template.html'
})
export class TooltipDemoComponent {
  setting = {name: 'hi tooltip', placement: 'top', trigger: 'hover'};
}
