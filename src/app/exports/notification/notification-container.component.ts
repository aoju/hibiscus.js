import { Component, Inject, Optional } from '@angular/core';

import { MessageContainerComponent } from '../message/message-container.component';

import { NotificationConfig, NOTIFICATION_CONFIG, NOTIFICATION_DEFAULT_CONFIG } from './notification-config';

@Component({
  selector           : 'hi-notification-container',
  preserveWhitespaces: false,
  templateUrl        : './notification-container.component.html'
})
export class NotificationContainerComponent extends MessageContainerComponent {

  constructor(@Optional() @Inject(NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NotificationConfig,
              @Optional() @Inject(NOTIFICATION_CONFIG) config: NotificationConfig) {
    super(defaultConfig, config);
  }

}
