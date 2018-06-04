import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, Input, ViewEncapsulation } from '@angular/core';

import { MessageComponent } from '../message/message.component';

import { NotificationContainerComponent } from './notification-container.component';
import { NotificationDataFilled } from './notification.definitions';

@Component({
  selector           : 'hi-notification',
  preserveWhitespaces: false,
  animations         : [
    trigger('enterLeave', [
      state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enterRight', [
        style({ opacity: 0, transform: 'translateX(5%)' }),
        animate('100ms linear')
      ]),
      state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enterLeft', [
        style({ opacity: 0, transform: 'translateX(-5%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({
        opacity        : 0,
        transform      : 'scaleY(0.8)',
        transformOrigin: '0% 0%'
      })),
      transition('* => leave', [
        style({
          opacity        : 1,
          transform      : 'scaleY(1)',
          transformOrigin: '0% 0%'
        }),
        animate('100ms linear')
      ])
    ])
  ],
  templateUrl         : './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent extends MessageComponent {
  @Input() hiMessage: NotificationDataFilled;

  constructor(private container: NotificationContainerComponent) {
    super(container);
  }

  close(): void {
    this._destroy();
  }

  get state(): string {
    if (this.hiMessage.state === 'enter') {
      if ((this.container.config.hiPlacement === 'topLeft') || (this.container.config.hiPlacement === 'bottomLeft')) {
        return 'enterLeft';
      } else {
        return 'enterRight';
      }
    } else {
      return this.hiMessage.state;
    }

  }
}
