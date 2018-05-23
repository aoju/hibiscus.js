import {
  Component,
  Input
} from '@angular/core';

import { fadeAnimation } from '../common/animation/fade-animations';
import { ToolTipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'hi-popover',
  preserveWhitespaces: false,
  animations: [ fadeAnimation ],
  templateUrl: './popover.component.html',
  styles: [ `
    .hi-popover { position: relative; }
  ` ]
})
export class PopoverComponent extends ToolTipComponent {
  _prefix = 'hi-popover-placement';
}
