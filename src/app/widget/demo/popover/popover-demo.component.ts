import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'hi-popover-demo',
  templateUrl: './popover-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverDemoComponent {
  name = 'hi';
  visible: boolean;
  clickMe() {
    this.visible = false;
  }
}
