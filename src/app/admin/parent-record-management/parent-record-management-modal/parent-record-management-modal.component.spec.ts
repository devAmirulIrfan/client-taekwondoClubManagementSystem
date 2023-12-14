import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRecordManagementModalComponent } from './parent-record-management-modal.component';

describe('ParentRecordManagementModalComponent', () => {
  let component: ParentRecordManagementModalComponent;
  let fixture: ComponentFixture<ParentRecordManagementModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentRecordManagementModalComponent]
    });
    fixture = TestBed.createComponent(ParentRecordManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
