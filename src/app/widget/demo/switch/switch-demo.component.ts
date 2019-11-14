import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'hi-switch-demo',
  templateUrl: './switch-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchDemoComponent {
  checked = true;
  disabled = false;

}
