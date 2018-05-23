/* tslint:disable:no-any */
import { Pipe, PipeTransform } from '@angular/core';
import { HiOptionGroupComponent } from './hi-option-group.component';
import { HiOptionComponent } from './hi-option.component';

export type TFilterOption = (input?: string, option?: HiOptionComponent) => boolean;

// TODO: can not dynamic change pipe pure yet
@Pipe({ name: 'hiFilterOptionPipe' })
export class HiOptionPipe implements PipeTransform {
  transform(options: HiOptionComponent[], input: string, filterOption: TFilterOption, serverSearch: boolean): HiOptionComponent[] {
    if (serverSearch || !input) {
      return options;
    } else {
      return options.filter(o => filterOption(input, o));
    }
  }
}

@Pipe({ name: 'hiSubFilterOptionPipe' })
export class HiSubOptionPipe implements PipeTransform {
  transform(groups: HiOptionGroupComponent[], input: string, filterOption: TFilterOption, serverSearch: boolean): HiOptionGroupComponent[] {
    if (serverSearch || !input) {
      return groups;
    } else {
      return groups.filter(g => {
        return g.listOfHiOptionComponent.some(o => filterOption(input, o));
      });
    }
  }
}

export function defaultFilterOption(input: string, option: HiOptionComponent): boolean {
  if (option && option.hiLabel) {
    return option.hiLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
  } else {
    return false;
  }
}
