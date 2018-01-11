import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
  selector: 'hi-doc',
  templateUrl: './doc.template.html'
})
export class DocComponent implements AfterViewInit {

  @ViewChildren('html') html: QueryList<ElementRef>;
  @ViewChildren('typescript') typescript: QueryList<ElementRef>;
  @ViewChildren('data') data: QueryList<ElementRef>;
  @ViewChildren('usage') usage: QueryList<ElementRef>;
  @Input() component: any;

  activeTabChange(id) {
    if (id === 'html') {
      setTimeout(() => {
        hljs.highlightBlock(this.html.last.nativeElement);
      }, 0);
    }
    if (id === 'typescript') {
      setTimeout(() => {
        hljs.highlightBlock(this.typescript.last.nativeElement);
      }, 0);
    }
    if (id === 'data') {
      setTimeout(() => {
        hljs.highlightBlock(this.data.last.nativeElement);
      }, 0);
    }
    if (id === 'usage') {
      setTimeout(() => {
        hljs.highlightBlock(this.usage.last.nativeElement);
      }, 0);
    }
  }

  ngAfterViewInit(): void {
    this.html.changes.subscribe((html) => {
      if (html.last) {
        hljs.highlightBlock(html.last.nativeElement);
      }
    });

    this.typescript.changes.subscribe((typescript) => {
      if (typescript.last) {
        hljs.highlightBlock(typescript.last.nativeElement);
      }
    });

    this.data.changes.subscribe((data) => {
      if (data.last) {
        hljs.highlightBlock(data.last.nativeElement);
      }
    });
  }

}
