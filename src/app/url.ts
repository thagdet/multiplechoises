import {Injectable} from '@angular/core';

@Injectable()
export class Url {
  public static URL = 'https://evening-sierra-59961.herokuapp.com/';
}
export const enum AUTH {
  AUTH_OK,
  UN_AUTHENTICATED,
  UN_AUTHORIZED,
}

