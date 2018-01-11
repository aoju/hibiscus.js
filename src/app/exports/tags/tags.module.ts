import { NgModule } from '@angular/core';

import { TagsComponent } from './tags.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HiCommonModule } from '../common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HiCommonModule
  ],
  providers: [],
  declarations: [
    TagsComponent
  ],
  exports: [
    TagsComponent
  ],
})
export class TagsModule {
}
