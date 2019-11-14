import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Breadcrumb } from './breadcrumbs.model';

@Component({
  selector: 'hi-breadcrumbs',
  templateUrl: './breadcrumbs.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {
  @Input() items: Breadcrumb[] = [];
  @Input() cssClass: string;

  itemClick(item: Breadcrumb) {
    if (item.handle) {
      item.handle(item);
    }
  }
}
