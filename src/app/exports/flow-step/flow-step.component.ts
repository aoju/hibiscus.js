import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {FlowStep} from './flow-step.model';

@Component({
  selector: 'hi-flow-step',
  templateUrl: './flow-step.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowStepComponent {
  @Input() type: 'dot' | 'arrow' = 'arrow';
  @Input() steps: FlowStep[];
  @Input() active: number;
  @Output() activeChange = new EventEmitter<number>();
  @Input() cssClass: string;

  stepClick(step, $index) {
    if ($index < this.active) {
      this.activeChange.emit($index);
    }
  }

}
