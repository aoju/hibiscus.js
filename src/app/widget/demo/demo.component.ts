import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Params} from '@angular/router';
import {DocumentRef} from '../../exports';
import {DemoService} from './demo.service';

@Component({
  selector: 'hi-orange-demo-view',
  templateUrl: './demo.template.html'
})
export class DemoComponent implements OnInit {
  components: any[];

  constructor(private demoService: DemoService,
              private domSanitizer: DomSanitizer,
              private documentRef: DocumentRef,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.documentRef.body.scrollTop = 0;
      this.components = this.demoService.components.filter(cmp => {
        return cmp.name === params.name;
      })
        .map((cmp) => {
          cmp.readme = this.domSanitizer.bypassSecurityTrustHtml(cmp.readme);
          cmp.typescript = this.fixTSModuleImport(cmp.typescript);
          return cmp;
        });
    });

  }

  private fixTSModuleImport(code): string {
    return (code || '').replace(/\.\.\/\.\.\/exports(\/.*)?/, 'hi');
  }

}
