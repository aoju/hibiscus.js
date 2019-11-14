import { InjectionToken } from '@angular/core';

import { MessageConfig } from '../message/message-config';

export interface NotificationConfig extends MessageConfig {
  hiTop?: string;
  hiBottom?: string;
  hiPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | string;
}

export const NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<NotificationConfig>('NOTIFICATION_DEFAULT_CONFIG');

export const NOTIFICATION_CONFIG = new InjectionToken<NotificationConfig>('NOTIFICATION_CONFIG');

export const NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
  provide : NOTIFICATION_DEFAULT_CONFIG,
  useValue: {
    hiTop         : '24px',
    hiBottom      : '24px',
    hiPlacement   : 'topRight',
    hiDuration    : 4500,
    hiMaxStack    : 7,
    hiPauseOnHover: true,
    hiAnimate     : true
  }
};
