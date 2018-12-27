import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './_services/login.service';
import { CreateTestService } from './_services/create-test.service';
import { SubjectComponent } from './subject/subject.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { SubjectService } from './_services/subject.service';
import { ClassOfAccountComponent } from './class-of-account/class-of-account.component';
import { ClassOfAccountService } from './_services/class-of-account.service';
import { ListTestDetailComponent } from './list-test-detail/list-test-detail.component';
import {TestDetailService} from './_services/test-detail.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SubjectComponent,
    CreateTestComponent,
    ClassOfAccountComponent,
    ListTestDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [
    LoginService,
    SubjectService,
    CreateTestService,
    CreateTestComponent,
    ClassOfAccountService,
    TestDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
