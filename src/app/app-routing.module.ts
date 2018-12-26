import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectComponent} from './subject/subject.component';
import {CreateTestComponent} from './create-test/create-test.component';

const routes: Routes = [
  { path: 'subject', component: SubjectComponent },
  { path: 'createTest', component: CreateTestComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
