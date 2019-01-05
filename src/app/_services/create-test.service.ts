import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Test } from '../_model/Test';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Url} from '../url';
import {Res} from '../_model/Res';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable()
export class CreateTestService {

  constructor(private http: HttpClient) { }
  beginTest(test: Test): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'test/begin', test, httpOptions).pipe(
      catchError(this.handleError <Res>('beginTest'))
    );
  }

  submitText(result: any): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'test/mark', result, httpOptions).pipe(
      catchError(this.handleError <Res>('submitText'))
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
