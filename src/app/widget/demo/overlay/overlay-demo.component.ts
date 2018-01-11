import {Component, ChangeDetectionStrategy} from '@angular/core';
import {OverlayService} from '../../../exports';

@Component({
  selector: 'hi-overlay-body-demo',
  template: `
    <div>
      <div class="overlay-demo-logo"></div>
      <div class="text-center">Hi NG overlay!</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayBodyDemoComponent {

}

@Component({
  selector: 'hi-overlay-demo',
  templateUrl: './overlay-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayDemoComponent {

  constructor(private  overlayService: OverlayService) {
  }

  openOverlay() {
    this.overlayService.open({html: `<div class="overlay-demo-logo"></div>`});
    setTimeout(() => this.overlayService.close(), 5 * 1000);
  }

  openComponentOverlay() {
    this.overlayService.open({component: OverlayBodyDemoComponent});
    setTimeout(() => this.overlayService.close(), 5 * 1000);
  }
}

