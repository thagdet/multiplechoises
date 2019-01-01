// resolver.ts
import {Injectable, Input} from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateTestService} from './_services/create-test.service';
import { Test } from './_model/Test';
import {Question} from './_model/Question';

@Injectable()
export class Resolver implements Resolve<Observable<any>> {
  constructor(private createTestService: CreateTestService) { }

  @Input() test = new Test();
  resolve() {
    this.test.idSubject = '5bf68355d787974b14407b1d';
    this.test.idTestDetail = '5c24bd0d45588926d40416be';
    this.test.idAccount = localStorage.getItem('idAccount');
    return this.createTestService.beginTest(this.test);
  }
}
