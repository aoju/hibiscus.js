import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { HiTooltipDirective } from '../tooltip/hi-tooltip.directive';

import { HiPopconfirmComponent } from './hi-popconfirm.component';

@Directive({
  selector: '[hi-popconfirm]'
})
export class HiPopconfirmDirective extends HiTooltipDirective {
  constructor(
      elementRef: ElementRef,
      hostView: ViewContainerRef,
      resolver: ComponentFactoryResolver,
      renderer: Renderer2,
      tooltip: HiPopconfirmComponent) {
    super(elementRef, hostView, resolver, renderer, tooltip);
  }
}
