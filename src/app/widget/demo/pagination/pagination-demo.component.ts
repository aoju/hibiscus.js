import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hi-pagination-demo',
  templateUrl: './pagination-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PaginationDemoComponent {

  pager = {
    total: 306,
    pageIndex: 5,
    pageSize: 10
  };
  gotoPage: number;

  pageChange(pageIndex) {
    console.log(`Hi pager change to: ${pageIndex}`, this.pager);
  }

  totalPage(): number {
    return Math.ceil(this.pager.total / this.pager.pageSize);
  }

  goto() {
    this.gotoPage = Math.max(1, this.gotoPage);
    this.gotoPage = Math.min(this.totalPage(), this.gotoPage);
    this.pager.pageIndex = this.gotoPage;
  }
}
