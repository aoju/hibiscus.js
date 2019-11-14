import { Overlay } from '@angular/cdk/overlay';
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef } from '@angular/core';

import { MessageBaseService } from '../message/message.service';

import { NotificationConfig } from './notification-config';
import { NotificationContainerComponent } from './notification-container.component';
import { NotificationData, NotificationDataFilled, NotificationDataOptions } from './notification.definitions';

@Injectable()
export class NotificationService extends MessageBaseService<NotificationContainerComponent, NotificationData, NotificationConfig> {

  constructor(
    overlay: Overlay,
    injector: Injector,
    cfr: ComponentFactoryResolver,
    appRef: ApplicationRef) {

    super(overlay, NotificationContainerComponent, injector, cfr, appRef, 'notification-');
  }

  // Shortcut methods
  success(title: string, content: string, options?: NotificationDataOptions): NotificationDataFilled {
    return this.createMessage({ type: 'success', title, content }, options) as NotificationDataFilled;
  }

  error(title: string, content: string, options?: NotificationDataOptions): NotificationDataFilled {
    return this.createMessage({ type: 'error', title, content }, options) as NotificationDataFilled;
  }

  info(title: string, content: string, options?: NotificationDataOptions): NotificationDataFilled {
    return this.createMessage({ type: 'info', title, content }, options) as NotificationDataFilled;
  }

  warning(title: string, content: string, options?: NotificationDataOptions): NotificationDataFilled {
    return this.createMessage({ type: 'warning', title, content }, options) as NotificationDataFilled;
  }

  blank(title: string, content: string, options?: NotificationDataOptions): NotificationDataFilled {
    return this.createMessage({ type: 'blank', title, content }, options) as NotificationDataFilled;
  }

  create(type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string, title: string, content: string, options?: NotificationDataOptions): NotificationDataFilled {
    return this.createMessage({ type, title, content }, options) as NotificationDataFilled;
  }

  // For content with template
  template(template: TemplateRef<{}>, options?: NotificationDataOptions): NotificationDataFilled {
    return this.createMessage({ template }, options) as NotificationDataFilled;
  }
}
