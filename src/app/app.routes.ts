import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {FramesComponent} from './frames/frames.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'widget',
    pathMatch: 'full'
  }, {
    path: '',
    component: FramesComponent,
    children: [{
      path: 'widget',
      loadChildren: './widget/widget.module#WidgetModule'
    }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule {
}
