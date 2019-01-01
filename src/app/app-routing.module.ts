import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectComponent} from './subject/subject.component';
import {CreateTestComponent} from './create-test/create-test.component';
import {ClassOfAccountComponent} from './class-of-account/class-of-account.component';
import {ListTestDetailComponent} from './list-test-detail/list-test-detail.component';
import {QuestionComponent} from './question/question.component';
import {Resolver} from './resovler';

const routes: Routes = [
  { path: 'subject', component: SubjectComponent },
  { path: 'createTest', component: CreateTestComponent, resolve: {DataValue: Resolver} },
  { path: 'class', component: ClassOfAccountComponent },
  { path: 'TestDetail/Class/:idSubject', component: ListTestDetailComponent},
  { path: 'TestDetail/Detail', component: QuestionComponent},
  { path: 'Question/Subject/:idSubject', component: QuestionComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
