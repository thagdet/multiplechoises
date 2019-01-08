import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Url} from '../url';
import {catchError} from 'rxjs/operators';
import {Res} from '../_model/Res';
import {Classes} from '../_model/Classes';
import {Subject} from '../_model/Subject';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable()
export class SubjectService {

  constructor(private http: HttpClient) { }
  GetAllSubjectNotSigned(idAccount: string): Observable <Res> {
    return this.http.get<Res>(Url.URL + 'subject/notSigned/' + idAccount, httpOptions).pipe(
      catchError(this.handleError <Res>('GetAllSubjectNotSigned'))
    );
  }

  CreateClass(classes: Classes): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'class/create', classes, httpOptions).pipe(
      catchError(this.handleError <Res>('CreateClass'))
    );
  }

  CreateNewSubject(subject: Subject): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'subject/create', subject, httpOptions).pipe(
      catchError(this.handleError <Res>('CreateNewSubject'))
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
