import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { TooltipDirective } from '../tooltip/hi-tooltip.directive';

import { PopconfirmComponent } from './hi-popconfirm.component';

@Directive({
  selector: '[hi-popconfirm]'
})
export class PopconfirmDirective extends TooltipDirective {
  constructor(
      elementRef: ElementRef,
      hostView: ViewContainerRef,
      resolver: ComponentFactoryResolver,
      renderer: Renderer2,
      tooltip: PopconfirmComponent) {
    super(elementRef, hostView, resolver, renderer, tooltip);
  }
}
