import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuideComponent} from './guide.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: GuideComponent
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

export class GuideRoutesModule {
}
