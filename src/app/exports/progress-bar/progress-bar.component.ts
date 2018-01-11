import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {HiNGConfig} from '../hi.config';

@Component({
  selector: 'hi-progress-bar',
  templateUrl: './progress-bar.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() type: '' | 'success' | 'info' | 'warning' | 'danger' = '';
  @Input() text: string;
  @Input() thin: boolean;
  @Input() max: number;
  @Input() animate: boolean;
  @Input() striped: boolean;
  @Input() value: number;
  @Input() cssClass: string;

  constructor(hiNGConfig: HiNGConfig) {
    this.type = <any>hiNGConfig.progressBar.type;
    this.animate = hiNGConfig.progressBar.animate;
    this.striped = hiNGConfig.progressBar.striped;
    this.max = hiNGConfig.progressBar.max;
  }
}
