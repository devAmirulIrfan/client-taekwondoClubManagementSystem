import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecordManagementQrModalComponent } from './student-record-management-qr-modal.component';

describe('StudentRecordManagementQrModalComponent', () => {
  let component: StudentRecordManagementQrModalComponent;
  let fixture: ComponentFixture<StudentRecordManagementQrModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRecordManagementQrModalComponent]
    });
    fixture = TestBed.createComponent(StudentRecordManagementQrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
