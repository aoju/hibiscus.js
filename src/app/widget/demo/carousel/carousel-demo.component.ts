import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'hi-carousel-demo',
  templateUrl: './carousel-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselDemoComponent {
  activeSlide = 0;
}
