import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRecordManagementComponent } from './parent-record-management.component';

describe('ParentRecordManagementComponent', () => {
  let component: ParentRecordManagementComponent;
  let fixture: ComponentFixture<ParentRecordManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentRecordManagementComponent]
    });
    fixture = TestBed.createComponent(ParentRecordManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
