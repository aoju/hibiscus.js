import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpParams,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpEventType,
  HttpEvent,
  HttpSentEvent,
  HttpUserEvent,
  HttpProgressEvent,
  HttpErrorResponse,
  HttpHeaderResponse,
} from '@angular/common/http';

function isObject(value): boolean {
  return value !== null && typeof value === 'object';
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isEmpty(value) {
  return typeof value === 'undefined' || value === null;
}

export interface HttpInterceptord {
  request?: (option: HttpRequest<any>) => HttpRequest<any> | void;
  response?: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>) => HttpEvent<any> | void;
}

@Injectable()
export class HttpProvider {
  private interceptors: HttpInterceptord[];

  constructor() {
    this.interceptors = [];
  }

  getInterceptors() {
    return this.interceptors;
  }

  addInterceptor(interceptor: HttpInterceptord): HttpProvider {
    this.interceptors.push(interceptor);
    return this;
  }

  addRequestInterceptor(interceptor: (res: HttpRequest<any>) => HttpRequest<any>): HttpProvider {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        return interceptor(request) || request;
      }
    });
  }

  addResponseInterceptor(interceptor: (res: any, request?: HttpRequest<any>) => any): HttpProvider {
    return this.addInterceptor({
      response: (response: HttpEvent<any>, request?: HttpRequest<any>): HttpEvent<any> | void => {
        return interceptor(response, request) || response;
      }
    });
  }

  addResponseErrorInterceptor(interceptor: (res: any, request?: HttpRequest<any>) => any): HttpProvider {
    return this.addInterceptor({
      response: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>): HttpEvent<any> | void => {
        if (response instanceof HttpErrorResponse) {
          return interceptor(response, request) || response;
        }
      }
    });
  }

  handleRequest(req: HttpRequest<any>): HttpRequest<any> {
    return this.interceptors
      .filter(item => !!item.request)
      .reduce((httpEvent, item) => {
        return (item.request(httpEvent) || httpEvent);
      }, req);
  }

  handleResponse(response: HttpEvent<any>, request?: HttpRequest<any>): HttpEvent<any> {
    return this.interceptors
      .filter(item => !!item.response)
      .reverse()
      .reduce((httpEvent, item) => {
        return item.response(httpEvent, request) || httpEvent;
      }, response);
  }

  baseUrl(host: string, excludes: RegExp[] = []): HttpProvider {
    this.interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url)) {
          return request;
        }

        const excludeUrl = excludes.some(t => t.test(request.url));
        if (excludeUrl) {
          return request;
        }

        host = host.replace(/\/$/, '');
        const url = request.url.replace(/^\//, '');
        return request.clone({url: `${host}/${url}`});
      }
    });

    return this;
  }

  headers(headers: { [name: string]: string | string[]; } = {}): HttpProvider {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        return request.clone({setHeaders: headers});
      }
    });
  }
}

@Injectable()
export class HttpInterceptors implements HttpInterceptor {
  constructor(private httpProvider: HttpProvider) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const httpRequest = this.httpProvider.handleRequest(req);
    return next.handle(httpRequest)
      .map(response => {
        if ([HttpEventType.Response, HttpEventType.ResponseHeader].indexOf(response.type) !== -1) {
          return (this.httpProvider.handleResponse(response, httpRequest) || response);
        }
        return response;
      })
      .catch(error => Observable.throw(this.httpProvider.handleResponse(error, httpRequest) || error));
  }

}

export class Httpd {

  constructor(protected http: HttpClient) {

  }

  protected getBaseUrl(): string {
    return null;
  }

  protected getHeaders(): Object {
    return null;
  }

  protected setBaseUrl(url: string) {
    return this.getBaseUrl = function () {
      return url;
    };
  }

  protected setHeaders(headers?: any) {
    return this.getHeaders = function () {
      return headers;
    };
  }

}

/**
 * Set the base URL of http resource
 * @param {String} url - base URL
 */
export function BaseUrl(url: string) {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    target.prototype.getBaseUrl = function () {
      return url;
    };
    return target;
  };
}

/**
 * Set default headers for every method of the RESTClient
 * @param {Object} headers - deafult headers in a key-value pair
 */
export function Headers(headers: any) {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    target.prototype.getHeaders = function () {
      return headers;
    };
    return target;
  };
}

function paramBuilder(paramName: string, optional = false) {
  return function (key?: string) {
    if (!optional && !key) {
      throw new Error(`${paramName} Key is required!`);
    }
    return function (target: Httpd, propertyKey: string | symbol, parameterIndex: number) {
      const metadataKey = `${propertyKey}_${paramName}_parameters`;
      const paramObj: any = {
        key: key,
        parameterIndex: parameterIndex
      };
      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export const Path = paramBuilder('Path');
/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export const Query = paramBuilder('Query', true);
/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export const Body = paramBuilder('Body')('Body');
/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export const Header = paramBuilder('Header');


export function RequestOptions(options: {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'response' | string,
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean,
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
  withCredentials?: boolean
}) {
  return function (target: Httpd, propertyKey: string, descriptor: any) {
    options.observe = options.observe || 'body';
    options.reportProgress = isUndefined(options.reportProgress) ? false : options.reportProgress;
    options.responseType = options.responseType || 'json';
    options.withCredentials = isUndefined(options.withCredentials) ? false : options.withCredentials;

    descriptor.requestOptions = options;
    return descriptor;
  };
}

function methodBuilder(method: string) {
  return function (url: string) {
    return function (target: Httpd, propertyKey: string, descriptor: any) {

      const pPath = target[`${propertyKey}_Path_parameters`];
      const pQuery = target[`${propertyKey}_Query_parameters`];
      const pBody = target[`${propertyKey}_Body_parameters`];
      const pHeader = target[`${propertyKey}_Header_parameters`];

      const oldDescriptor = descriptor.value;

      descriptor.value = function (...args: any[]) {

        // call method for test coverage
        try {
          oldDescriptor.apply(this, args);
        } catch (e) {
          e.toString();
        }

        // Body
        let body = '';
        if (pBody) {
          body = args[pBody[0].parameterIndex];
        }

        // Path
        let resUrl: string = url;
        if (pPath) {
          for (let k in pPath) {
            if (pPath.hasOwnProperty(k)) {
              resUrl = resUrl.replace(`:${pPath[k].key}`, encodeURIComponent(args[pPath[k].parameterIndex]));
            }
          }
        }

        // Query
        let params = new HttpParams();
        if (pQuery) {
          params = pQuery
            .filter(p => !isUndefined(args[p.parameterIndex]))
            .reduce((ps, p) => {
              const key = p.key;
              const value = args[p.parameterIndex];
              let result = ps;

              if (value instanceof Date) {
                result = result.set(key, (<Date>value).getTime().toString());
              } else if (Array.isArray(value)) {
                result = result.set(key, value.map((item) => item).join(','));
              } else if (isObject(value)) {
                for (let k in value) {
                  if (value.hasOwnProperty(k) && !isUndefined(value[k])) {
                    result = result.set(k, value[k]);
                  }
                }
              } else if (!isEmpty(value)) {
                result = result.set(key, value.toString());
              } else {
                result = result.set(key, '');
              }

              return result;
            }, params);
        }

        // Headers
        // set class default headers
        let headers = new HttpHeaders(this.getHeaders());
        // set method specific headers
        for (let k in descriptor.headers) {
          if (descriptor.headers.hasOwnProperty(k)) {
            headers = headers.append(k, descriptor.headers[k]);
          }
        }

        if (pHeader) {
          for (let k in pHeader) {
            if (pHeader.hasOwnProperty(k)) {
              headers = headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
            }
          }
        }

        let baseUrl = this.getBaseUrl();
        let host = baseUrl ? baseUrl.replace(/\/$/, '') + '/' : '';
        const requestUrl = `${host}${resUrl.replace(/^\//, '')}`;

        let defaultOptions = descriptor.requestOptions;
        if (defaultOptions) {
          let headerKeys = defaultOptions.headers ? defaultOptions.headers.keys() : [];
          for (let i = 0; i < headerKeys.length; i++) {
            const k = headerKeys[i];
            headers = headers.append(k, defaultOptions.headers.get(k));
          }

          let paramKeys = defaultOptions.params ? defaultOptions.params.keys() : [];
          for (let i = 0; i < paramKeys.length; i++) {
            const k = paramKeys[i];
            params = params.append(k, defaultOptions.params.get(k));
          }
        }

        let options = {
          body,
          headers,
          params,
          observe: defaultOptions ? defaultOptions.observe : 'body',
          reportProgress: defaultOptions ? defaultOptions.reportProgress : false,
          responseType: defaultOptions ? defaultOptions.responseType : 'json',
          withCredentials: defaultOptions ? defaultOptions.withCredentials : false
        };

        return this.http.request(method, requestUrl, options);
      };

      return descriptor;
    };
  };
}

/**
 * GET method
 * @param {string} url - resource url of the method
 */
export const GET = methodBuilder('GET');
/**
 * JSONP method
 * @param {string} url - resource url of the method
 */
export const JSONP = methodBuilder('JSONP');
/**
 * POST method
 * @param {string} url - resource url of the method
 */
export const POST = methodBuilder('POST');
/**
 * PUT method
 * @param {string} url - resource url of the method
 */
export const PUT = methodBuilder('PUT');
/**
 * DELETE method
 * @param {string} url - resource url of the method
 */
export const DELETE = methodBuilder('DELETE');
/**
 * HEAD method
 * @param {string} url - resource url of the method
 */
export const HEAD = methodBuilder('HEAD');
/**
 * PATCH method
 * @param {string} url - resource url of the method
 */
export const PATCH = methodBuilder('PATCH');
/**
 * OPTIONS method
 * @param {string} url - resource url of the method
 */
export const OPTIONS = methodBuilder('OPTIONS');

export const HTTP_PROVIDERS: any[] = [
  HttpProvider
];
