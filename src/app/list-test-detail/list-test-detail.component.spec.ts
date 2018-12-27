import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTestDetailComponent } from './list-test-detail.component';

describe('ListTestDetailComponent', () => {
  let component: ListTestDetailComponent;
  let fixture: ComponentFixture<ListTestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
