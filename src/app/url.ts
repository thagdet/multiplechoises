import {Injectable} from '@angular/core';

@Injectable()
export class Url {
  public static URL = 'http://192.168.12.118ont:1234/';
}

export const enum AUTH {
  AUTH_OK,
  UN_AUTHENTICATED,
  UN_AUTHORIZED,
}

