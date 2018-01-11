import {Component, ChangeDetectionStrategy} from '@angular/core';
import * as NProgress from 'nprogress';

@Component({
  selector: 'hi-progress-bar-demo',
  templateUrl: './progress-bar-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarDemoComponent {

  isNPStart() {
    NProgress.start();
  }

  isNPSet() {
    NProgress.set(0.4);
  }

  isNPInc() {
    NProgress.inc();
  }

  isNPDone() {
    NProgress.done();
  }

}
