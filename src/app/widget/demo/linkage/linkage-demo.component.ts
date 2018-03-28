import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'hi-linkage-demo',
  templateUrl: './linkage-demo.template.html'
})
export class LinkageDemoComponent {

  public list: Array<any>;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.request(
      'http://test.gm.api.hidoctor.cc/router/rest?method=hidoctor.area.all&v=1.0&format=json&pageSize=10&pageNum=1'
    ).subscribe((res) => {
      this.list = res.json().data;
      console.log(this.list);
    });
  }

}
