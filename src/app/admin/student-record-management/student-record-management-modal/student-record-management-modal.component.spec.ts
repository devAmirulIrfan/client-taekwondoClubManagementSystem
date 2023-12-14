import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecordManagementModalComponent } from './student-record-management-modal.component';

describe('StudentRecordManagementModalComponent', () => {
  let component: StudentRecordManagementModalComponent;
  let fixture: ComponentFixture<StudentRecordManagementModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRecordManagementModalComponent]
    });
    fixture = TestBed.createComponent(StudentRecordManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
