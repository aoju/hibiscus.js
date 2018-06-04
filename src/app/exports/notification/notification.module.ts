import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NOTIFICATION_DEFAULT_CONFIG_PROVIDER } from './notification-config';
import { NotificationContainerComponent } from './notification-container.component';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [ CommonModule, OverlayModule ],
  declarations: [ NotificationComponent, NotificationContainerComponent ],
  providers: [ NOTIFICATION_DEFAULT_CONFIG_PROVIDER, NotificationService ],
  entryComponents: [ NotificationContainerComponent ]
})
export class NotificationModule { }
