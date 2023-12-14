import { TestBed } from '@angular/core/testing';

import { ParentRecordManagementService } from './parent-record-management.service';

describe('ParentRecordManagementService', () => {
  let service: ParentRecordManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentRecordManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
