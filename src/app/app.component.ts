/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {HiNGConfig} from './exports';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'body',
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private hiNGConfig: HiNGConfig,
              private viewContainerRef: ViewContainerRef) {
    hiNGConfig.rootContainer = this.viewContainerRef;
  }

  public ngOnInit() {
    console.log('%c*****\u63a2\u5bfb\u8fd9\u91cc\u7684\u79d8\u5bc6*****', 'font-size:1em;color:#178c06');
  }

}
