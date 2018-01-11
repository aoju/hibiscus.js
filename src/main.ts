/**
 * Angular bootstrapping
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {decorateModule} from './app/app.strategy';

/**
 * App Module
 * our top level module that holds all of our components
 */
import {AppModule} from './app/app.module';

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModule)
    .catch((err) => console.error(err));
}

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main();
}

function _domReadyHandler() {
  document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
  main();
}
