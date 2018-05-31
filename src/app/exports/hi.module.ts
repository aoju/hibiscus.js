import {NgModule} from '@angular/core';
import {AccordionModule} from './accordion';
import {ActionButtonModule} from './action-button';
import {AlertBoxModule} from './alert-box';
import {AutoCompleteModule} from './auto-complete';
import {BadgeModule} from './badge';
import {BreadcrumbsModule} from './breadcrumbs';
import {CalendarModule} from './calendar';
import {CarouselModule} from './carousel';
import {CascaderModule} from './cascader';
import {CheckboxGroupModule} from './checkbox-group';
import {HiCommonModule, AssetsLoader} from './common';
import {DataTableModule} from './data-table';
import {DatePickerModule} from './date-picker';
import {DialogService, DialogModule} from './dialog';
import {DraggableModule} from './draggable';
import {FileUploadModule} from './file-upload';
import {FlowStepModule} from './flow-step';
import {HttpModule} from './http';
import {ImageUploadModule} from './image-upload';
import {InfiniteScrollModule} from './infinite-scroll';
import {ModalService, ModalModule} from './modal';
import {NotifyModule, NotifyService} from './notify';
import {OAauth2Module} from './oauth2';
import {OverlayModule, OverlayService} from './overlay';
import {PagerModule} from './pager';
import {PaginationModule} from './pagination';
import {PositionService} from './position';
import {ProgressBarModule} from './progress-bar';
import {RadioGroupModule} from './radio-group';
import {RatingModule} from './rating';
import {SelectModule} from './select';
import {SelectButtonModule} from './select-button';
import {SliderModule} from './slider';
import {StorageModule} from './storage';
import {SwitchModule} from './switch';
import {TabsModule} from './tabs';
import {TagsModule} from './tags';
import {TimePickerModule} from './time-picker';
import {TooltipModule} from './tooltip';
import {PopconfirmModule} from './popconfirm';
import {SpinModule} from './spin';
import {PopoverModule} from './popover';
import {NotificationModule} from './notification';
import {MessageModule} from './message';
import {TreeViewModule, TreeViewService} from './tree-view';
import {HiValidatorsModule} from './validators';
import {COMMON_SERVICES} from './window-ref';

import {HiNGConfig} from './hi.config';

@NgModule({
  imports: [
    AccordionModule,
    ActionButtonModule,
    AlertBoxModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbsModule,
    CalendarModule,
    CarouselModule,
    CascaderModule,
    CheckboxGroupModule,
    HiCommonModule,
    DataTableModule,
    DatePickerModule,
    DialogModule,
    DraggableModule,
    FileUploadModule,
    FlowStepModule,
    HttpModule,
    ImageUploadModule,
    InfiniteScrollModule,
    ModalModule,
    NotifyModule,
    OAauth2Module,
    OverlayModule,
    PagerModule,
    PaginationModule,
    ProgressBarModule,
    RadioGroupModule,
    RatingModule,
    SelectModule,
    SelectButtonModule,
    SliderModule,
    StorageModule,
    SwitchModule,
    TabsModule,
    TagsModule,
    TimePickerModule,
    TooltipModule,
    PopconfirmModule,
    SpinModule,
    PopoverModule,
    NotificationModule,
    MessageModule,
    TreeViewModule,
    HiValidatorsModule
  ],
  exports: [
    AccordionModule,
    ActionButtonModule,
    AlertBoxModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbsModule,
    CalendarModule,
    CarouselModule,
    CascaderModule,
    CheckboxGroupModule,
    HiCommonModule,
    DataTableModule,
    DatePickerModule,
    DialogModule,
    DraggableModule,
    FileUploadModule,
    FlowStepModule,
    HttpModule,
    ImageUploadModule,
    InfiniteScrollModule,
    ModalModule,
    NotifyModule,
    OAauth2Module,
    OverlayModule,
    PagerModule,
    PaginationModule,
    ProgressBarModule,
    RadioGroupModule,
    RatingModule,
    SelectModule,
    SelectButtonModule,
    SliderModule,
    StorageModule,
    SwitchModule,
    TabsModule,
    TagsModule,
    TimePickerModule,
    TooltipModule,
    PopconfirmModule,
    SpinModule,
    PopoverModule,
    NotificationModule,
    MessageModule,
    TreeViewModule,
    HiValidatorsModule
  ],
  providers:
    [
      ...COMMON_SERVICES,
      {provide: HiNGConfig, useClass: HiNGConfig},
      {provide: ModalService, useClass: ModalService},
      {provide: AssetsLoader, useClass: AssetsLoader},
      {provide: DialogService, useClass: DialogService},
      {provide: NotifyService, useClass: NotifyService},
      {provide: OverlayService, useClass: OverlayService},
      {provide: PositionService, useClass: PositionService},
      {provide: TreeViewService, useClass: TreeViewService}
    ]
})

export class HiNGModule {

}
