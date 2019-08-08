import {Injectable, Type} from '@angular/core';
import {
  AccordionDemoComponent,
  ActionButtonDemoComponent,
  AlertBoxDemoComponent,
  AutoCompleteDemoComponent,
  BadgeDemoComponent,
  BreadcrumbsDemoComponent,
  CalendarDemoComponent,
  CarouselDemoComponent,
  CascaderDemoComponent,
  CheckboxGroupDemoComponent,
  DataTableDemoComponent,
  DatePickerDemoComponent,
  DialogDemoComponent,
  DraggableDemoComponent,
  FileUploadDemoComponent,
  FlowStepDemoComponent,
  IcomoonDemoComponent,
  ImageCropperDemoComponent,
  ImageUploadDemoComponent,
  InfiniteScrollDemoComponent,
  ModalDemoComponent,
  NotifyDemoComponent,
  OverlayDemoComponent,
  PagerDemoComponent,
  PaginationDemoComponent,
  ProgressBarDemoComponent,
  RatingDemoComponent,
  SelectDemoComponent,
  SelectButtonDemoComponent,
  SwitchDemoComponent,
  SliderDemoComponent,
  TabsDemoComponent,
  TagsDemoComponent,
  TooltipDemoComponent,
  PopconfirmDemoComponent,
  SpinDemoComponent,
  PopoverDemoComponent,
  MessageDemoComponent,
  NotificationDemoComponent,
  TreeViewDemoComponent,
  TimePickerDemoComponent,
  RadioGroupDemoComponent,
  ValidatorsDemoComponent
} from './index';

@Injectable()
export class DemoService {

  components: {
    name: string,
    component: Type<any>,
    directory?: string,
    readme?: any,
    html?: string,
    typescript?: string,
    data?: any,
    usage?: any
  }[] = [
    {
      name: 'Accordion',
      directory: 'accordion',
      component: AccordionDemoComponent,
      readme: '',
      html: require('!raw-loader!./accordion/accordion-demo.template.html'),
      typescript: require('!raw-loader!./accordion/accordion-demo.component.ts')
    }, {
      name: 'ActionButton',
      directory: 'action-button',
      component: ActionButtonDemoComponent,
      readme: '',
      html: require('!raw-loader!./action-button/action-button-demo.template.html'),
      typescript: require('!raw-loader!./action-button/action-button-demo.component.ts')
    }, {
      name: 'AlertBox',
      directory: 'alert-box',
      component: AlertBoxDemoComponent,
      readme: '',
      html: require('!raw-loader!./alert-box/alert-box-demo.template.html'),
      typescript: require('!raw-loader!./alert-box/alert-box-demo.component.ts')
    }, {
      name: 'AutoComplete',
      directory: 'auto-complete',
      component: AutoCompleteDemoComponent,
      readme: '',
      html: require('!raw-loader!./auto-complete/auto-complete-demo.template.html'),
      typescript: require('!raw-loader!./auto-complete/auto-complete-demo.component.ts')
    }, {
      name: 'Badge',
      directory: 'badge',
      component: BadgeDemoComponent,
      readme: '',
      html: require('!raw-loader!./badge/badge-demo.template.html'),
      typescript: require('!raw-loader!./badge/badge-demo.component.ts')
    }, {
      name: 'Breadcrumbs',
      directory: 'breadcrumbs',
      component: BreadcrumbsDemoComponent,
      readme: '',
      html: require('!raw-loader!./breadcrumbs/breadcrumbs-demo.template.html'),
      typescript: require('!raw-loader!./breadcrumbs/breadcrumbs-demo.component.ts')
    }, {
      name: 'Calendar',
      directory: 'calendar',
      component: CalendarDemoComponent,
      readme: '',
      html: require('!raw-loader!./calendar/calendar-demo.template.html'),
      typescript: require('!raw-loader!./calendar/calendar-demo.component.ts')
    }, {
      name: 'Carousel',
      directory: 'carousel',
      component: CarouselDemoComponent,
      readme: '',
      html: require('!raw-loader!./carousel/carousel-demo.template.html'),
      typescript: require('!raw-loader!./carousel/carousel-demo.component.ts')
    }, {
      name: 'Cascader',
      directory: 'cascader',
      component: CascaderDemoComponent,
      readme: '',
      html: require('!raw-loader!./cascader/cascader-demo.template.html'),
      typescript: require('!raw-loader!./cascader/cascader-demo.component.ts')
    }, {
      name: 'CheckboxGroup',
      directory: 'checkbox-group',
      component: CheckboxGroupDemoComponent,
      readme: '',
      html: require('!raw-loader!./checkbox-group/checkbox-group-demo.template.html'),
      typescript: require('!raw-loader!./checkbox-group/checkbox-group-demo.component.ts')
    }, {
      name: 'DataTable',
      directory: 'data-table',
      component: DataTableDemoComponent,
      readme: '',
      html: require('!raw-loader!./data-table/data-table-demo.template.html'),
      typescript: require('!raw-loader!./data-table/data-table-demo.component.ts')
    }, {
      name: 'DatePicker',
      directory: 'date-picker',
      component: DatePickerDemoComponent,
      readme: '',
      html: require('!raw-loader!./date-picker/date-picker-demo.template.html'),
      typescript: require('!raw-loader!./date-picker/date-picker-demo.component.ts')
    }, {
      name: 'Dialog',
      directory: 'dialog',
      component: DialogDemoComponent,
      readme: '',
      html: require('!raw-loader!./dialog/dialog-demo.template.html'),
      typescript: require('!raw-loader!./dialog/dialog-demo.component.ts')
    }, {
      name: 'Draggable',
      directory: 'draggable',
      component: DraggableDemoComponent,
      readme: '',
      html: require('!raw-loader!./draggable/draggable-demo.template.html'),
      typescript: require('!raw-loader!./draggable/draggable-demo.component.ts')
    }, {
      name: 'FileUpload',
      directory: 'file-upload',
      component: FileUploadDemoComponent,
      readme: '',
      html: require('!raw-loader!./file-upload/file-upload-demo.template.html'),
      typescript: require('!raw-loader!./file-upload/file-upload-demo.component.ts')
    }, {
      name: 'FlowStep',
      directory: 'flow-step',
      component: FlowStepDemoComponent,
      readme: '',
      html: require('!raw-loader!./flow-step/flow-step-demo.template.html'),
      typescript: require('!raw-loader!./flow-step/flow-step-demo.component.ts')
    }, {
      name: 'Icomoon',
      directory: 'icon',
      component: IcomoonDemoComponent,
      readme: '',
      html: require('!raw-loader!./icon/icomoon-demo.template.html'),
      typescript: require('!raw-loader!./icon/icomoon-demo.component.ts')
    }, {
      name: 'ImageCropper',
      directory: 'image-cropper',
      component: ImageCropperDemoComponent,
      readme: '',
      html: require('!raw-loader!./image-cropper/image-cropper-demo.template.html'),
      typescript: require('!raw-loader!./image-cropper/image-cropper-demo.component.ts')
    }, {
      name: 'ImageUpload',
      directory: 'image-upload',
      component: ImageUploadDemoComponent,
      readme: '',
      html: require('!raw-loader!./image-upload/image-upload-demo.template.html'),
      typescript: require('!raw-loader!./image-upload/image-upload-demo.component.ts')
    }, {
      name: 'InfiniteScroll',
      directory: 'infinite-scroll',
      component: InfiniteScrollDemoComponent,
      readme: '',
      html: require('!raw-loader!./infinite-scroll/infinite-scroll-demo.template.html'),
      typescript: require('!raw-loader!./infinite-scroll/infinite-scroll-demo.component.ts')
    }, {
      name: 'Modal',
      directory: 'modal',
      component: ModalDemoComponent,
      readme: '',
      html: require('!raw-loader!./modal/modal-demo.template.html'),
      typescript: require('!raw-loader!./modal/modal-demo.component.ts')
    }, {
      name: 'Notify',
      directory: 'notify',
      component: NotifyDemoComponent,
      readme: '',
      html: require('!raw-loader!./notify/notify-demo.template.html'),
      typescript: require('!raw-loader!./notify/notify-demo.component.ts')
    }, {
      name: 'Overlay',
      directory: 'select-button',
      component: OverlayDemoComponent,
      readme: '',
      html: require('!raw-loader!./overlay/overlay-demo.template.html'),
      typescript: require('!raw-loader!./overlay/overlay-demo.component.ts')
    }, {
      name: 'Pager',
      directory: 'pager',
      component: PagerDemoComponent,
      readme: '',
      html: require('!raw-loader!./pager/pager-demo.template.html'),
      typescript: require('!raw-loader!./pager/pager-demo.component.ts')
    },
    {
      name: 'Pagination',
      directory: 'pagination',
      component: PaginationDemoComponent,
      readme: '',
      html: require('!raw-loader!./pagination/pagination-demo.template.html'),
      typescript: require('!raw-loader!./pagination/pagination-demo.component.ts')
    }, {
      name: 'ProgressBar',
      directory: 'progress-bar',
      component: ProgressBarDemoComponent,
      readme: '',
      html: require('!raw-loader!./progress-bar/progress-bar-demo.template.html'),
      typescript: require('!raw-loader!./progress-bar/progress-bar-demo.component.ts')
    }, {
      name: 'RadioGroup',
      directory: 'radio-group',
      component: RadioGroupDemoComponent,
      readme: '',
      html: require('!raw-loader!./radio-group/radio-group-demo.template.html'),
      typescript: require('!raw-loader!./radio-group/radio-group-demo.component.ts')
    }, {
      name: 'Rating',
      directory: 'rating',
      component: RatingDemoComponent,
      readme: '',
      html: require('!raw-loader!./rating/rating-demo.template.html'),
      typescript: require('!raw-loader!./rating/rating-demo.component.ts')
    }, {
      name: 'Select',
      directory: 'select',
      component: SelectDemoComponent,
      readme: '',
      html: require('!raw-loader!./select/select-demo.template.html'),
      typescript: require('!raw-loader!./select/select-demo.component.ts')
    }, {
      name: 'SelectButton',
      directory: 'select-button',
      component: SelectButtonDemoComponent,
      readme: '',
      html: require('!raw-loader!./select-button/select-button-demo.template.html'),
      typescript: require('!raw-loader!./select-button/select-button-demo.component.ts')
    }, {
      name: 'Slider',
      directory: 'slider',
      component: SliderDemoComponent,
      readme: '',
      html: require('!raw-loader!./slider/slider-demo.template.html'),
      typescript: require('!raw-loader!./slider/slider-demo.component.ts')
    }, {
      name: 'Switch',
      directory: 'carousel',
      component: SwitchDemoComponent,
      readme: '',
      html: require('!raw-loader!./switch/switch-demo.template.html'),
      typescript: require('!raw-loader!./switch/switch-demo.component.ts')
    }, {
      name: 'Tabs',
      directory: 'tabs',
      component: TabsDemoComponent,
      readme: '',
      html: require('!raw-loader!./tabs/tabs-demo.template.html'),
      typescript: require('!raw-loader!./tabs/tabs-demo.component.ts')
    }, {
      name: 'Tags',
      directory: 'tags',
      component: TagsDemoComponent,
      readme: '',
      html: require('!raw-loader!./tags/tags-demo.template.html'),
      typescript: require('!raw-loader!./tags/tags-demo.component.ts')
    }, {
      name: 'TimePicker',
      directory: 'time-picker',
      component: TimePickerDemoComponent,
      readme: '',
      html: require('!raw-loader!./time-picker/time-picker-demo.template.html'),
      typescript: require('!raw-loader!./time-picker/time-picker-demo.component.ts')
    }, {
      name: 'Tooltip',
      directory: 'tooltip',
      component: TooltipDemoComponent,
      readme: '',
      html: require('!raw-loader!./tooltip/tooltip-demo.template.html'),
      typescript: require('!raw-loader!./tooltip/tooltip-demo.component.ts')
    }, {
      name: 'Popconfirm',
      directory: 'popconfirm',
      component: PopconfirmDemoComponent,
      readme: '',
      html: require('!raw-loader!./popconfirm/popconfirm-demo.template.html'),
      typescript: require('!raw-loader!./popconfirm/popconfirm-demo.component.ts')
    }, {
      name: 'Spin',
      directory: 'spin',
      component: SpinDemoComponent,
      readme: '',
      html: require('!raw-loader!./spin/spin-demo.template.html'),
      typescript: require('!raw-loader!./spin/spin-demo.component.ts')
    }, {
      name: 'Popover',
      directory: 'popover',
      component: PopoverDemoComponent,
      readme: '',
      html: require('!raw-loader!./popover/popover-demo.template.html'),
      typescript: require('!raw-loader!./popover/popover-demo.component.ts')
    }, {
      name: 'Message',
      directory: 'message',
      component: MessageDemoComponent,
      readme: '',
      html: require('!raw-loader!./message/message-demo.template.html'),
      typescript: require('!raw-loader!./message/message-demo.component.ts')
    }, {
      name: 'Notification',
      directory: 'notification',
      component: NotificationDemoComponent,
      readme: '',
      html: require('!raw-loader!./notification/notification-demo.template.html'),
      typescript: require('!raw-loader!./notification/notification-demo.component.ts')
    }, {
      name: 'TreeView',
      directory: 'tree-view',
      component: TreeViewDemoComponent,
      readme: '',
      html: require('!raw-loader!./tree-view/tree-view-demo.template.html'),
      typescript: require('!raw-loader!./tree-view/tree-view-demo.component.ts'),
      data: require('!raw-loader!./tree-view/data.json'),
    }, {
      name: 'Validators',
      directory: 'validators',
      component: ValidatorsDemoComponent,
      readme: '',
      html: require('!raw-loader!./validators/validators-demo.template.html'),
      typescript: require('!raw-loader!./validators/validators-demo.component.ts')
    }
  ];

}
