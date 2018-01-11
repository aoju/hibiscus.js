import {Component, Input} from '@angular/core';
import {NotifyModel} from './notify.model';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-notify',
  templateUrl: './notify.template.html',
  host: {
    '[style.width]': 'width',
    '[class]': '(placement ? "alert-" + placement : "") + " " + (cssClass || "")',
  }
})
export class NotifyComponent {
  @Input() notifies: NotifyModel[] = [];
  @Input() width: string;
  @Input() cssClass: string;
  @Input() placement: 'top' | 'top-right' | 'bottom' | 'bottom-right' | 'center';

  constructor(private hiNGConfig: HiNGConfig) {
    this.placement = <any>hiNGConfig.alertBoxPanel.placement;
    this.cssClass = hiNGConfig.alertBoxPanel.cssClass;
    this.width = hiNGConfig.alertBoxPanel.width;
  }

  close(item) {
    this.notifies = this.notifies.filter((box) => box !== item);
  }
}
