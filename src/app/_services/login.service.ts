import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Account } from '../_model/Account';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Url} from '../url';
import {Login} from '../_model/login';

const httpOptions = {
  headers: new HttpHeaders({
      'Access-Control-Allow-Headers' : '*',
      'Content-Type': 'application/json',
    })
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  login(account: Account): Observable <Login> {
    return this.http.post<Login>(Url.URL + 'account/checklogin', account, httpOptions).pipe(
      catchError(this.handleError <Login>('login'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (response: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(response); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${response.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
