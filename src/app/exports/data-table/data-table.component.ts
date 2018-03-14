import {Component, Input, OnChanges, SimpleChange, Optional, OnInit} from '@angular/core';
import {DataTable, PageEvent, SortEvent} from './data-table.directive';
import * as _ from 'lodash';

@Component({
  selector: 'hi-data-pagination',
  template: `
    <hi-data-paginator #p [table]="table">
      <ul class="pagination" *ngIf="p.dataLength > p.rowsOnPage">
        <li class="page-item" [class.disabled]="p.activePage <= 1" (click)="p.setPage(1)">
          <a class="page-link" style="cursor: pointer">&laquo;</a>
        </li>
        <li class="page-item" *ngIf="p.activePage > 4 && p.activePage + 1 > p.lastPage" (click)="p.setPage(p.activePage - 4)">
          <a class="page-link" style="cursor: pointer">{{p.activePage - 4}}</a>
        </li>
        <li class="page-item" *ngIf="p.activePage > 3 && p.activePage + 2 > p.lastPage" (click)="p.setPage(p.activePage - 3)">
          <a class="page-link" style="cursor: pointer">{{p.activePage - 3}}</a>
        </li>
        <li class="page-item" *ngIf="p.activePage > 2" (click)="p.setPage(p.activePage - 2)">
          <a class="page-link" style="cursor: pointer">{{p.activePage - 2}}</a>
        </li>
        <li class="page-item" *ngIf="p.activePage > 1" (click)="p.setPage(p.activePage - 1)">
          <a class="page-link" style="cursor: pointer">{{p.activePage - 1}}</a>
        </li>
        <li class="page-item active">
          <a class="page-link" style="cursor: pointer">{{p.activePage}}</a>
        </li>
        <li class="page-item" *ngIf="p.activePage + 1 <= p.lastPage" (click)="p.setPage(p.activePage + 1)">
          <a class="page-link" style="cursor: pointer">{{p.activePage + 1}}</a>
        </li>
        <li class="page-item" *ngIf="p.activePage + 2 <= p.lastPage" (click)="p.setPage(p.activePage + 2)">
          <a class="page-link" style="cursor: pointer">{{p.activePage + 2}}</a>
        </li>
        <li class="page-item" *ngIf="p.activePage + 3 <= p.lastPage && p.activePage < 3" (click)="p.setPage(p.activePage + 3)">
          <a class="page-link" style="cursor: pointer">{{p.activePage + 3}}</a>
        </li>
        <li class="page-item" *ngIf="p.activePage + 4 <= p.lastPage && p.activePage < 2" (click)="p.setPage(p.activePage + 4)">
          <a class="page-link" style="cursor: pointer">{{p.activePage + 4}}</a>
        </li>
        <li class="page-item" [class.disabled]="p.activePage >= p.lastPage" (click)="p.setPage(p.lastPage)">
          <a class="page-link" style="cursor: pointer">&raquo;</a>
        </li>
      </ul>
      <ul class="pagination pull-right float-sm-right" *ngIf="p.dataLength > minRowsOnPage">
        <li class="page-item" *ngFor="let rows of rowsOnPageSet" [class.active]="p.rowsOnPage===rows" (click)="p.setRowsOnPage(rows)">
          <a class="page-link" style="cursor: pointer">{{rows}}</a>
        </li>
      </ul>
    </hi-data-paginator>
  `
})
export class BootstrapPaginator implements OnChanges {

  @Input('rowsOnPageSet') rowsOnPageSet = [];
  @Input('table') table: DataTable;
  minRowsOnPage = 0;

  ngOnChanges(changes: any): any {
    if (changes.rowsOnPageSet) {
      this.minRowsOnPage = _.min(this.rowsOnPageSet)
    }
  }

}

@Component({
  selector: 'hi-data-paginator',
  template: `
    <ng-content></ng-content>`
})
export class Paginator implements OnChanges {

  @Input('table') inputMfTable: DataTable;
  private table: DataTable;
  public activePage: number;
  public rowsOnPage: number;
  public dataLength: number;
  public lastPage: number;

  public constructor(@Optional() private injectMfTable: DataTable) {
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    this.table = this.inputMfTable || this.injectMfTable;
    this.onPageChangeSubscriber(this.table.getPage());
    this.table.onPageChange.subscribe(this.onPageChangeSubscriber);
  }

  public setPage(pageNumber: number): void {
    this.table.setPage(pageNumber, this.rowsOnPage);
  }

  public setRowsOnPage(rowsOnPage: number): void {
    this.table.setPage(this.activePage, rowsOnPage);
  }

  private onPageChangeSubscriber = (event: PageEvent) => {
    this.activePage = event.activePage;
    this.rowsOnPage = event.rowsOnPage;
    this.dataLength = event.dataLength;
    this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
  }

}

@Component({
  selector: 'hi-data-sort',
  template: `
    <a style="cursor: pointer" (click)="sort()" class="text-nowrap">
      <ng-content></ng-content>
      <span *ngIf="isSortedByMeAsc" class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
      <span *ngIf="isSortedByMeDesc" class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
    </a>`
})
export class DataSort implements OnInit {

  @Input('by') sortBy: string;
  isSortedByMeAsc: boolean = false;
  isSortedByMeDesc: boolean = false;

  public constructor(private table: DataTable) {
  }

  public ngOnInit(): void {
    this.table.onSortChange.subscribe((event: SortEvent) => {
      this.isSortedByMeAsc = (event.sortBy == this.sortBy && event.sortOrder == 'asc');
      this.isSortedByMeDesc = (event.sortBy == this.sortBy && event.sortOrder == 'desc');
    });
  }

  sort() {
    if (this.isSortedByMeAsc) {
      this.table.setSort(this.sortBy, 'desc');
    } else {
      this.table.setSort(this.sortBy, 'asc');
    }
  }

}
