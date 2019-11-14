import {Component} from '@angular/core';

@Component({
  selector: 'hi-accordion-demo',
  templateUrl: './accordion-demo.template.html'
})
export class AccordionDemoComponent {

  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  status: any = {
    isOpen: true,
    isDisabled: false
  };

  groups: any[] = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  addItem(): void {
    this.items.push(`Items ${this.items.length + 1}`);
  }

  log(event: boolean) {
    console.log(`Accordion has been ${event ? 'opened' : 'closed'}`);
  }

}
