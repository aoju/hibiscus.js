import {Injectable} from '@angular/core';
import {StorageType, StorageService} from '../storage';
import {OAuth2Config} from './oauth2.config';

const isBlank = (obj) => {
  return obj === null || obj === undefined;
};

@Injectable()
export class OAuth2Service {

  private STORAGE_POOL_KEY = 'hi-oauth2';
  private STORAGE_DATA_KEY = 'hi-data';
  private STORAGE_TOKEN_KEY = 'hi-token';
  private storageType: StorageType;
  private data: any;
  private token: any;

  constructor(public storage: StorageService,
              public config: OAuth2Config) {
    this.storageType = isBlank(config.storageType) ?
      StorageType.localStorage : config.storageType;
  }

  setStorageType(storageType: StorageType) {
    this.storageType = storageType;
  }

  set(data: any): void {
    this.storage.put({
      pool: this.STORAGE_POOL_KEY,
      key: this.STORAGE_DATA_KEY,
      storageType: this.storageType
    }, data);

    this.data = data;
    if (this.data.token) {
      this.setToken(this.data.token);
    }
  }

  get(): any {
    if (this.data) {
      return this.data;
    }

    return this.data = this.storage.get({
      pool: this.STORAGE_POOL_KEY,
      key: this.STORAGE_DATA_KEY,
      storageType: this.storageType
    });
  }

  setToken(token: any): void {
    this.storage.put({
      pool: this.STORAGE_POOL_KEY,
      key: this.STORAGE_TOKEN_KEY,
      storageType: this.storageType
    }, token);

    this.token = token;
  }

  getToken(): any {
    if (this.token) {
      return this.token;
    }
    return this.token = this.storage.get({
      pool: this.STORAGE_POOL_KEY,
      key: this.STORAGE_TOKEN_KEY,
      storageType: this.storageType
    });
  }

  remove() {
    this.removeToken();
    this.data = null;
    return this.storage.remove({
      pool: this.STORAGE_POOL_KEY,
      key: this.STORAGE_DATA_KEY,
      storageType: this.storageType
    });
  }

  removeToken() {
    this.token = null;
    return this.storage.remove({
      pool: this.STORAGE_POOL_KEY,
      key: this.STORAGE_TOKEN_KEY,
      storageType: this.storageType
    });
  }

  isAuthorized() {
    return !!this.get() === false ? !!this.getToken() : true;
  }

}
