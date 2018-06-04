import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MESSAGE_DEFAULT_CONFIG_PROVIDER } from './message-config';
import { MessageContainerComponent } from './message-container.component';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
  imports: [ CommonModule, OverlayModule ],
  declarations: [ MessageContainerComponent, MessageComponent ],
  providers: [ MESSAGE_DEFAULT_CONFIG_PROVIDER, MessageService ],
  entryComponents: [ MessageContainerComponent ]
})
export class MessageModule { }
