import { Directive } from '@angular/core';

@Directive({
  selector: '[hi-select-unselectable]',
  host    : {
    '[attr.unselectable]': '"unselectable"',
    '[style.user-select]': '"none"'
  }
})
export class SelectUnselectableDirective {

}
