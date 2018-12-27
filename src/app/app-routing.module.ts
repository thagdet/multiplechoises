import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectComponent} from './subject/subject.component';
import {CreateTestComponent} from './create-test/create-test.component';
import {ClassOfAccountComponent} from './class-of-account/class-of-account.component';

const routes: Routes = [
  { path: 'subject', component: SubjectComponent },
  { path: 'createTest', component: CreateTestComponent },
  { path: 'class', component: ClassOfAccountComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
