import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: './guide/guide.module#GuideModule'
  }, {
    path: 'demo',
    loadChildren: './demo/demo.module#DemoModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutesModule {
}
