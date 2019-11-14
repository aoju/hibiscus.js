import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DemoComponent} from './demo.component';

export const ROUTES: Routes = [
  {
    path: 'component/:name',
    component: DemoComponent
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
