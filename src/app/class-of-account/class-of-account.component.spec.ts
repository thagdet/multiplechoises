import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassOfAccountComponent } from './class-of-account.component';

describe('ClassOfAccountComponent', () => {
  let component: ClassOfAccountComponent;
  let fixture: ComponentFixture<ClassOfAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassOfAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
