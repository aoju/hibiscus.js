import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FlowStep} from '../../../exports';

@Component({
  selector: 'hi-flow-step-demo',
  templateUrl: './flow-step-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowStepDemoComponent {
  active = 0;
  steps: FlowStep[] = [
    {
      title: 'Submit order',
      icon: 'icmn-cart',
      description: 'Step 1 description'
    },
    {
      title: 'Payment',
      icon: 'icmn-coin-yen',
      description: 'Step 2 description'
    },
    {
      title: 'Posting',
      icon: 'icmn-airplane',
      description: 'Posting ....'
    },
    {
      title: 'Sign',
      icon: 'icmn-cool2',
      description: 'Step 4 description'
    },
    {
      title: 'Completed',
      icon: 'icmn-checkmark',
      description: 'Step 5 description'
    }
  ];
}
