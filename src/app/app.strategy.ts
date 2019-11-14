import {enableDebugTools, disableDebugTools} from '@angular/platform-browser';
import {ApplicationRef, enableProdMode} from '@angular/core';

/**
 * Environment Providers
 */
let PROVIDERS: any[] = [
  /**
   * Common env directives
   */
];

/**
 * Angular debug tools in the dev console
 */
let _decorateModule = <T>(value: T): T => {
  return value;
};

if ('prod' === ENV || 'production' === ENV) {
  enableProdMode();

  /**
   * Prod
   */
  _decorateModule = (modRef: any) => {
    disableDebugTools();
    return modRef;
  };

  PROVIDERS = [
    ...PROVIDERS,
    /**
     * Custom providers in production.
     */
  ];

} else {

  _decorateModule = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    enableDebugTools(cmpRef);
    return modRef;
  };

  /**
   * Dev
   */
  PROVIDERS = [
    ...PROVIDERS,
    /**
     * Custom providers in development.
     */
  ];

}

export const decorateModule = _decorateModule;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
