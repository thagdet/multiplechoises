import {Injectable} from '@angular/core';

@Injectable()
export class Url {
  public static URL = 'http://localhost:1234/';
}

export const enum AUTH {
  AUTH_OK,
  UN_AUTHENTICATED,
  UN_AUTHORIZED,
}

