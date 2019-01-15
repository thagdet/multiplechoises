import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Res} from '../_model/Res';
import {Url} from '../url';
import {catchError} from 'rxjs/operators';
import {User} from '../_model/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  getUser(id: string): Observable <Res> {
    return this.http.get<Res>(Url.URL + 'user/' + id, httpOptions).pipe(
      catchError(this.handleError <Res>('getUser'))
    );
  }

  updateUser(user: User): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'user/update', user, httpOptions).pipe(
      catchError(this.handleError <Res>('updateUser'))
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
