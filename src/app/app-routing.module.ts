import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectComponent} from './subject/subject.component';

const routes: Routes = [
  { path: 'subject', component: SubjectComponent },
  { path: 'createTest', component: CreateTestComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
