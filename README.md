<p align="center">
	<a target="_blank" href="https://www.mit-license.org">
		<img src="https://img.shields.io/badge/license-MIT-green.svg">
	</a>
	<a target="_blank" href="https://nodejs.org">
		<img src="https://img.shields.io/badge/node-%3E=8.0.0-brightgreen.svg">
	</a>
	<a target="_blank" href="https://www.npmjs.com">
		<img src="https://img.shields.io/badge/npm-%3E=7.0.0-green.svg">
	</a>
		<a target="_blank" href="https://eslint.org">
		<img src="https://img.shields.io/badge/eslint-%5E3.0.0-blue.svg">
	</a>
	<a target="_blank" href="https://travis-ci.org/aoju/hibiscus.js">
		<img src="https://travis-ci.org/aoju/hibiscus.js.svg?branch=master">
	</a>
</p>

<p align="center">
	-- QQ群①：<a href="https://shang.qq.com/wpa/qunwpa?idkey=17fadd02891457034c6536c984f0d7db29b73ea14c9b86bba39ce18ed7a90e18">839128</a> --
	-- QQ群②：<a href="https://shang.qq.com/wpa/qunwpa?idkey=c207666cbc107d03d368bde8fc15605bb883ebc482e28d440de149e3e2217460">839120</a> --
</p>

---

# Getting started 

> Native Angular directives for Bootstrap4


* [Angular](https://angular.io/) (requires `Angular` version 4.0.0 or higher)
* [Bootstrap CSS](http://getbootstrap.com/) (`bootstrap-sass` 4.0.0)
* [DateFns](https://date-fns.org/) (`date-fns` 1.27.2 or higher. It is for `DatePicker` parse & format date)

*Notice*: `OnPush` @Input is recommended in `@hibiscus.js`, so use `Immutable.js` will be easy.

* Angular 4: version <= 0.0.23; Angular 5: version >= 0.1.0  Angular 6: version >= 0.1.0 

## Components

- [x] Accordion
- [x] Action button
- [x] Alert Confirm
- [x] Badge
- [x] Breadcrumbs
- [ ] Calendar
- [x] Carousel
- [x] Cascader
- [x] Checkbox Group
- [x] DatePicker
- [x] Dialog
- [ ] Echarts
- [x] File Upload
- [x] Flow Steps
- [x] http
- [x] Image Cropper
- [x] Image Upload
- [x] Infinite Scroll
- [x] Modal
- [x] Message
- [x] Notify
- [x] Notification
- [x] OAuth2
- [x] Overlay
- [x] Pager
- [x] Pagination
- [x] Popconfirm
- [x] Popover
- [x] Progress Bar
- [x] Radio Group
- [x] Rating
- [x] Select
- [x] Select Button
- [x] Storage
- [x] Switch
- [x] Spin
- [x] Tabs
- [x] Tags
- [x] TimePicker
- [x] Tooltip
- [x] Tree View
- [x] Validators

## Installation

After installing the above dependencies, install `@hibiscus.js` via: 
  
    npm install --save hibiscus.js
  
Once installed you need to import our main module.

    import { HiNGModule } from 'hibiscus.js';
  
Then use `HiNGModule` to declare on your root module:

    
    @NgModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        BrowserModule,
        HiNGModule,
      ],
      providers: [
      ],
      bootstrap: [
      ]
      AppComponent[
      
      ]
    })
    export class AppModule {
    }


And use `HiNGModule` to declare on your feature module:

    @NgModule({
      imports: [CommonModule, FormsModule, HiNGModule],
      exports: [DatePickerDemoComponent],
      declarations: [DatePickerDemoComponent],
      providers: [],
    })
    export class DatePickerDemoModule {
    }


## Animations

`@hibiscus.js` have got animations done. So You should include `BrowserAnimationsModule` or `NoopAnimationsModule` to your `AppModule`.

example:

    import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
    
    @NgModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        BrowserModule,
        SharedModule,
        HiNGModule,
        BrowserAnimationsModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule {
    }
    
### Contributors
    
[<img alt="Kemosabe" src="https://avatars0.githubusercontent.com/u/5940699?s=460&v=4" width="117">](https://github.com/immrj) | [<img alt="Chenalan" src="https://avatars2.githubusercontent.com/u/7518753?s=460&v=4" width="117">](https://github.com/chenalan)| [<img alt="RumbleC" src="hhttps://avatars3.githubusercontent.com/u/22806436?s=460&v=4" width="117">](https://github.com/RumbleC)
:---: |:---: |:---: |
[Kemosabe](https://github.com/immrj) |[Chenalan](https://github.com/chenalan) |[RumbleC](https://github.com/RumbleC)