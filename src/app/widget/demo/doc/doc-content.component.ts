import {
  Component,
  Type,
  Input,
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'hi-doc-content',
  template: ''
})
export class DocContentComponent implements OnDestroy {
  component: Type<any>;
  componentRef: ComponentRef<any>;

  constructor(private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector) {
  }

  @Input()
  set content(component: Type<any>) {
    this.component = component;
    this.onComponentChange();
  }

  get content() {
    return this.component;
  }

  onComponentChange() {
    this.destroyCmp();
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.componentRef = this.viewContainerRef.createComponent(factory, this.viewContainerRef.length, this.injector);
    this.componentRef.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroyCmp();
  }

  private destroyCmp() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
