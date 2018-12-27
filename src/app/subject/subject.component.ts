import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubjectService } from '../_services/subject.service';
import { Subject } from '../_model/Subject';
import { CreateTestComponent } from '../create-test/create-test.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  constructor(
    private subjectService: SubjectService,
    private createTestComponent: CreateTestComponent,
  ) { }

  ngOnInit() {

  }
}
