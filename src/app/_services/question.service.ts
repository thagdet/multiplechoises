import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Res} from '../_model/Res';
import {Url} from '../url';
import {catchError} from 'rxjs/operators';
import {Question} from '../_model/Question';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers' : '*',
    'Content-Type': 'application/json',
  }).set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  GetAllQuestionByIdSubject(idSubject: string): Observable <Res> {
    return this.http.get<Res>(Url.URL + 'question/subject/' + idSubject, httpOptions).pipe(
      catchError(this.handleError <Res>('GetAllQuestionByIdSubject'))
    );
  }

  UpdateQuestion(question: Question): Observable <Res> {
    return this.http.put<Res>(Url.URL + 'question/update/' + question._id, question, httpOptions).pipe(
      catchError(this.handleError <Res>('UpdateQuestion'))
    );
  }

  CreateQuestion(question: any): Observable <Res> {
    return this.http.post<Res>(Url.URL + 'question/create', question, httpOptions).pipe(
      catchError(this.handleError <Res>('CreateQuestion'))
    );
  }

  DeleteQuestion(id: string): Observable <Res> {
    return this.http.delete<Res>(Url.URL + 'question/delete/' + id, httpOptions).pipe(
      catchError(this.handleError <Res>('CreateQuestion'))
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
