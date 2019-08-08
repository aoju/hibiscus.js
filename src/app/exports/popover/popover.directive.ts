import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { TooltipDirective } from '../tooltip/tooltip.directive';

import { PopoverComponent } from './popover.component';

@Directive({
  selector: '[hi-popover]'
})
export class PopoverDirective extends TooltipDirective {
  constructor(
      elementRef: ElementRef,
      hostView: ViewContainerRef,
      resolver: ComponentFactoryResolver,
      renderer: Renderer2,
      tooltip: PopoverComponent) {
    super(elementRef, hostView, resolver, renderer, tooltip);
  }
}
