import {Component, ChangeDetectionStrategy} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'hi-auto-complete-demo',
  templateUrl: './auto-complete-demo.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDemoComponent {
  selectItem1 = 'C#';
  selectItem2: string;
  selectItem3: string;
  selectItem4: string;
  selectItem5: string;
  mutipleItems: string[] = ['C#', 'C', 'C++', 'CPython', 'Java'];
  isDisabled = false;
  icons = ['icmn-file-play', 'icmn-plus', 'icmn-coin-euro', 'icmn-stumbleupon'];
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  onSearchLocal = (term) => of(this.languages
    .filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1))

  onSearchObject = (term) => of(this.languages
    .map((lang, index) => ({label: lang, id: index}))
    .filter(lang => lang.label.toLowerCase().indexOf(term.toLowerCase()) !== -1)
  )

  searchWiki = (term) => {
    return this.httpClient
      .jsonp(`https://en.wikipedia.org/w/api.php?search=${term}&action=opensearch&format=json`,
        'callback')
      .map(response => <string[]> response[1]);
  }

  onSearch = (term) => {
    return this.searchWiki(term);
  }

  constructor(private httpClient: HttpClient) {

  }

  getIcon(index) {
    return this.icons[index % this.icons.length];
  }

}
