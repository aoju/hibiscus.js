import {Component, OnInit} from '@angular/core';
import {DemoService} from '../widget/demo/demo.service';

@Component({
  selector: 'hi-orange-frames-view',
  templateUrl: './frames.template.html'
})
export class FramesComponent implements OnInit {

  menus: MenuBar[];

  constructor(private demoService: DemoService) {

  }

  public ngOnInit() {

    let components = this.demoService.components
      .sort((a, b) => a.name.localeCompare(b.name));

    this.menus = [{
      name: '组件信息',
      icon: 'icmn-rocket',
      divider: true,
      style: 'hi_sidebar_left_sub hi_sidebar_left--colorful--success',
      children: components.map(item => {
        return {
          name: item.name,
          icon: 'icmn-underline',
          url: [`/widget/demo/component/${item.name}`]
        };
      })
    }];

    $(function () {
      const tableEl = $('.table-of-contents'),

        tableOffset = tableEl.offset().top,
        windowEl = $(window),
        contentEl = $('.card'),
        contentOffset = contentEl.offset().top;


      windowEl.on('scroll', function () {
        if (windowEl.width() >= 991) {
          const windowTop = windowEl.scrollTop();
          if (windowTop > tableOffset) {
            if (windowTop < contentEl.height() - tableEl.height() - tableOffset - contentOffset - 20 - 200) {
              tableEl.css('transform', 'translate3d(0px, ' + (windowTop - tableOffset + contentOffset + 20) + 'px, 0px)');
            }
          } else {
            tableEl.css('transform', 'translate3d(0px, 0px, 0px)');
          }
        }
      });

      windowEl.on('resize', function () {
        tableEl.css('transform', 'translate3d(0px, 0px, 0px)');
      });

    });
  }
}

export interface MenuBar {
  id?: string | number;
  name?: string;
  icon?: string;
  url?: any;
  divider?: boolean;
  style?: string;
  children?: MenuBar[];
}
