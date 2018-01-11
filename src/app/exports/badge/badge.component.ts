import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'hi-badge',
  template: '',
  host: {
    '[class]': '"badge " + (cssClass ? cssClass : "")',
    '[innerText]': 'text'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() cssClass: string;
  @Input() text: string;
}
