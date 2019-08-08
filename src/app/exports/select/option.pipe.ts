/* tslint:disable:no-any */
import { Pipe, PipeTransform } from '@angular/core';
import { OptionGroupComponent } from './option-group.component';
import { OptionComponent } from './option.component';

export type TFilterOption = (input?: string, option?: OptionComponent) => boolean;

// TODO: can not dynamic change pipe pure yet
@Pipe({ name: 'hiFilterOptionPipe' })
export class OptionPipe implements PipeTransform {
  transform(options: OptionComponent[], input: string, filterOption: TFilterOption, serverSearch: boolean): OptionComponent[] {
    if (serverSearch || !input) {
      return options;
    } else {
      return options.filter(o => filterOption(input, o));
    }
  }
}

@Pipe({ name: 'hiSubFilterOptionPipe' })
export class SubOptionPipe implements PipeTransform {
  transform(groups: OptionGroupComponent[], input: string, filterOption: TFilterOption, serverSearch: boolean): OptionGroupComponent[] {
    if (serverSearch || !input) {
      return groups;
    } else {
      return groups.filter(g => {
        return g.listOfHiOptionComponent.some(o => filterOption(input, o));
      });
    }
  }
}

export function defaultFilterOption(input: string, option: OptionComponent): boolean {
  if (option && option.hiLabel) {
    return option.hiLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
  } else {
    return false;
  }
}
