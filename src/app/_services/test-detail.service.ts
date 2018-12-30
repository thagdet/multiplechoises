import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Url} from '../url';
import {catchError} from 'rxjs/operators';
import {TestDetail} from '../_model/TestDetail';
import {Res} from '../_model/Res';
import {Test} from '../_model/Test';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable()
export class TestDetailService {

  constructor(private http: HttpClient) { }
  CreateTestDetail(testDetail: TestDetail): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'testDetails/create', testDetail, httpOptions).pipe(
      catchError(this.handleError <Res>('CreateTestDetail'))
    );
  }

  GetAllTestDetailByIdSubject(idSubject: string): Observable <Res> {
    return this.http.get<Res>(Url.URL + 'testDetails/idSubject/' + idSubject, httpOptions).pipe(
      catchError(this.handleError <Res>('GetAllTestDetailByIdSubject'))
    );
  }

  UpdateTestDetail(testDetail: TestDetail): Observable <Res> {
    return this.http.put<Res>(Url.URL + 'testDetails/update/' + testDetail._id, testDetail, httpOptions).pipe(
      catchError(this.handleError <Res>('UpdateTestDetail'))
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
