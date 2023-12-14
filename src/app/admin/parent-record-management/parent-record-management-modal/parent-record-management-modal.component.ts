import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParentRecordManagementService } from '../parent-record-management.service';
import { parentRecordFormModel } from '../config/form-config/form-model.config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { requestParentRecordForm } from '../config/model-config/request-response-model-config';

@Component({
  selector: 'app-parent-record-management-modal',
  templateUrl: './parent-record-management-modal.component.html',
  styleUrls: ['./parent-record-management-modal.component.scss']
})
export class ParentRecordManagementModalComponent implements OnInit{

  dialCode = ['010', '011', '012', '013', '014', '015', '016', '017', '018', '019']

  parentRecordForm!: FormGroup<parentRecordFormModel>

  isUpdateMode = false

  ngOnInit() {
    this.initializeForm()
    this.checkIfActionIsUpdate()
  }

  constructor(
    public dialogRef: MatDialogRef<ParentRecordManagementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ParentRecordManagementService
    ){
  }

  initializeForm() {
    this.parentRecordForm = new FormGroup<parentRecordFormModel>({
      parentName: new FormControl<string | null>(null, Validators.required),
      centerId: new FormControl<number | null>(null, Validators.required),
      dialCode: new FormControl<string | null>(null, Validators.required),
      contactNo: new FormControl<string | null>(null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      address: new FormControl<string | null>(null, [Validators.required]),
      statusId: new FormControl<number | null>(null, Validators.required),
    })
  }

  submit(){
   console.log('is form valid :', this.parentRecordForm.valid)
   console.log('form value :', this.parentRecordForm.value)
   if(this.parentRecordForm.valid) this.dialogRef.close(this.formModalData())
  }

  formModalData(): string{

    const contactNo = `${this.parentRecordForm.controls.dialCode.value}-${this.parentRecordForm.controls.contactNo.value}`

    const parentRecordFormValues: requestParentRecordForm = {
      parentName: this.parentRecordForm.controls.parentName.value,
      centerId: this.parentRecordForm.controls.centerId.value,
      contactNo: contactNo,
      email: this.parentRecordForm.controls.email.getRawValue() ?? null,
      address: this.parentRecordForm.controls.address.value,
      statusId: this.parentRecordForm.controls.statusId.value,
    }
    return this.processFormModalDataToObject(parentRecordFormValues)
  }

  processFormModalDataToObject(parentRecordFormValues: requestParentRecordForm): any {
    if(this.data.mode === "Add") return {mode: this.data.mode, formValue: parentRecordFormValues}
    if(this.data.mode === "Update") return {mode: this.data.mode, formValue: parentRecordFormValues, parentId: this.data.parentId}
  }

  checkIfActionIsUpdate(){
    console.log(this.data.mode)
    if(this.data.mode === "Update") {
       this.isUpdateMode = true
       this.patchForm()
    }
  }

  patchForm(){
    console.log(this.data.parentId)
    this.service.getSingleParent(this.data.parentId).subscribe((response) =>{
      console.log(response)
      this.parentRecordForm.patchValue({
        parentName: response.parentName,
        centerId: response.centerId,
        dialCode: this.getDialCode(response.contactNo),
        contactNo: this.getContactNo(response.contactNo),
        email: response.email,
        address: response.address,
        statusId: response.statusId
      })
    })
  }

  getDialCode(telephoneNumber: string): string{
    const trimmedDialCodeString = telephoneNumber.substring(0,3)
    return trimmedDialCodeString
  }

  getContactNo(telephoneNumber: string): string {
  
    const dialCode = this.getDialCode(telephoneNumber)

    const contactNo = telephoneNumber.replace(`${dialCode}-`, '')

    return contactNo
    
  }


}
