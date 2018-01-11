import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'hi-popover-demo',
  templateUrl: './popover-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverDemoComponent {
  name = 'hi';

}
