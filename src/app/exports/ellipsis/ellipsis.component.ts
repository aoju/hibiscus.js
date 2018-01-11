import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {HiNGConfig} from '../hi.config';
import {DocumentRef} from '../window-ref/document-ref.service';

@Component({
  selector: 'hi-ellipsis',
  templateUrl: './ellipsis.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ellipsis'
})
export class EllipsisComponent {
  length: number;
  fullText = '';
  ellipsisText = '';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right';
  @Input() html = false;

  constructor(hiNGConfig: HiNGConfig, private documentRef: DocumentRef) {
    this.length = hiNGConfig.ellipsis.length;
    this.placement = <any>hiNGConfig.ellipsis.placement;
  }

  @Input()
  set max(length: number) {
    this.length = length;
    this.ellipsis();
  }

  @Input()
  set text(text: string) {
    this.fullText = text || '';
    this.ellipsis();
  }

  private ellipsis() {
    const text = this.html ? this.unCodeHtml(this.fullText) : this.fullText;
    this.ellipsisText = text.length > this.length ? text.substr(0, this.length) : '';
  }

  private unCodeHtml(text: string) {
    const $div = this.documentRef.createElement('div');
    $div.innerHTML = text;
    text = $div.innerText;
    return text;
  }
}
