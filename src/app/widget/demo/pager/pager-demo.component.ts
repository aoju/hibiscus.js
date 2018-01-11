import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'hi-pager-demo',
  templateUrl: './pager-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerDemoComponent {
  pager = {
    total: 106,
    pageIndex: 5,
    pageSize: 10
  };

  pageChange(pageIndex) {
    console.log(`Hi pager change to: ${pageIndex}`, this.pager);
  }

}
