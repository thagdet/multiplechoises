import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Account } from '../_model/Account';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Url} from '../url';
import {Res} from '../_model/Res';

const httpOptions = {
  headers: new HttpHeaders({
      'Access-Control-Allow-Headers' : '*',
      'Content-Type': 'application/json',
    })
};

const httpOptions2 = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  login(account: Account): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'account/checklogin', account, httpOptions).pipe(
      catchError(this.handleError <Res>('login'))
    );
  }

  register(account: Account): Observable <Res> {
    // httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Res>(Url.URL + 'account/create', account, httpOptions2).pipe(
      catchError(this.handleError <Res>('register'))
    );
  }

  ping(): Observable <Res> {
    return this.http.get<Res>(Url.URL + 'account/ping', httpOptions).pipe(
      catchError(this.handleError <Res>('ping'))
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
