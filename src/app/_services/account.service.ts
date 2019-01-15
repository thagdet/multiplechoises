import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Res} from '../_model/Res';
import {Url} from '../url';
import {catchError} from 'rxjs/operators';
import {Account} from '../_model/Account';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllAccount(): Observable <Res> {
    return this.http.get<Res>(Url.URL + 'account/', httpOptions).pipe(
      catchError(this.handleError <Res>('getAllAccount'))
    );
  }

  createAccount(account: Account): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'account/create', account, httpOptions).pipe(
      catchError(this.handleError <Res>('createAccount'))
    );
  }

  updateAccount(account: Account): Observable <Res> {
    return this.http.put<Res>(Url.URL + 'account/update/' + account._id, account, httpOptions).pipe(
      catchError(this.handleError <Res>('updateAccount'))
    );
  }

  deleteAccount(id: number): Observable <Res> {
    return this.http.delete<Res>(Url.URL + 'account/delete/' + id, httpOptions).pipe(
      catchError(this.handleError <Res>('deleteAccount'))
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
