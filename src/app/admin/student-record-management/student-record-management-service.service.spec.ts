import { TestBed } from '@angular/core/testing';

import { StudentRecordManagementServiceService } from './student-record-management-service.service';

describe('StudentRecordManagementServiceService', () => {
  let service: StudentRecordManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRecordManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
