import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Breadcrumb} from '../../../exports';
import * as Immutable from 'immutable';

@Component({
  selector: 'hi-breadcrumbs-demo',
  templateUrl: './breadcrumbs-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsDemoComponent {
  items = Immutable.List<Breadcrumb>([
    {
      text: 'Home',
      icon: 'icmn-home'
    },
    {
      text: ' / Library'
    },
    {
      text: ' / Data',
      handle: item => console.log('Clicked', item)
    }
  ]);

  pushItem() {
    this.items = this.items.push({text: ' / Test',  handle: item => console.log('Clicked', item)});
  }

  removeLastItem() {
    this.items = this.items.remove(this.items.size - 1);
  }

}
