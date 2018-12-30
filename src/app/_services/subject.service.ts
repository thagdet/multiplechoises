import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Url} from '../url';
import {catchError} from 'rxjs/operators';
import {Res} from '../_model/Res';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable()
export class SubjectService {

  constructor(private http: HttpClient) { }
  GetAllSubjectByIdAccount(id: string): Observable <Res> {
    return this.http.get<Res>(Url.URL + 'class/idAccount/' + id, httpOptions).pipe(
      catchError(this.handleError <Res>('GetAllSubjectByIdAccount'))
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
