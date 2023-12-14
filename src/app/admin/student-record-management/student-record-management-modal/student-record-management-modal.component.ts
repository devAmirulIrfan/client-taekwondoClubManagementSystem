import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { requestStudentRecordForm, responseStudentGrade, responseStudentParent, responseStudentRecord, responseStudentStatus } from './config/model-config/request-response-model-config';
import { studentRecordFormModel } from './config/form-config/form-model.config';
import { StudentRecordManagementServiceService } from '../student-record-management-service.service';

@Component({
  selector: 'app-student-record-management-modal',
  templateUrl: './student-record-management-modal.component.html',
  styleUrls: ['./student-record-management-modal.component.scss']
})
export class StudentRecordManagementModalComponent implements OnInit {

  myControl = new FormControl();
  filteredParentName!: responseStudentParent[]
  filteredParentName2!:  Observable<string | null>

  studentRecordForm!: FormGroup<studentRecordFormModel>

  constructor(
    public dialogRef: MatDialogRef<StudentRecordManagementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: StudentRecordManagementServiceService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.dialogRef.disableClose =true
    this.checkIfAddOrUpdate()
  }

  searchParentName(){

    const searchValue = (document.getElementById("search") as HTMLInputElement).value.toLocaleLowerCase()

    let filteredValue!: responseStudentParent[]

    filteredValue = [...this.data.parentRecord.filter((parent: responseStudentParent) => parent.parentName.toLowerCase().includes(searchValue))]

    this.filteredParentName = [...filteredValue]
  }

  
  initializeForm() {
    this.studentRecordForm = new FormGroup<studentRecordFormModel>({
      studentName: new FormControl<string | null>(null, Validators.required),
      birthDate: new FormControl<string | null>(null, Validators.required),
      gradeId: new FormControl<number | null>(null, Validators.required),
      parentName: new FormControl<string | null>(null, Validators.required),
      statusId: new FormControl<number | null>(null, Validators.required),
    })
  }

  patchForm() {
    this.service.getSingleStudent(this.data.studentId).subscribe((response) => {
      console.log(response)
      this.studentRecordForm.patchValue({
        studentName: response.studentName,
        birthDate: response.birthDate,
        gradeId: response.gradeId,
        parentName: response.parentName,
        statusId: response.statusId
      });
    })
  }
  
  checkIfAddOrUpdate(){this.data.mode === "Update" ? this.patchForm() : null}

  submit() {
    if (this.studentRecordForm.valid)  this.dialogRef.close(this.formModalData())
  }

  formModalData(){
        const parentId = this.data.parentRecord.find((parentData: responseStudentParent) => parentData.parentName === this.studentRecordForm.controls.parentName.value)

        const studentRecordFormValues: requestStudentRecordForm = {
        studentName: this.studentRecordForm.controls.studentName.value,
        birthDate:  this.studentRecordForm.controls.birthDate.value !== null ? this.transformDateFormat(this.studentRecordForm.controls.birthDate.value): null,
        gradeId: this.studentRecordForm.controls.gradeId.value ,
        parentId: parentId.id,
        statusId: this.studentRecordForm.controls.statusId.value
      }

      return this.processFormModalDataToObject(studentRecordFormValues)
  }

  processFormModalDataToObject(studentRecordFormValues: requestStudentRecordForm): any{
    if(this.data.mode === "Add") return {mode: this.data.mode, formValue: studentRecordFormValues, studentId: null}

    if(this.data.mode === "Update") return {mode: this.data.mode, formValue:  studentRecordFormValues, studentId: this.data.studentId}
  }

  transformDateFormat(birthDate: string): string{

        const formattedDate = new Date(birthDate).toISOString().slice(0, 10)

        return formattedDate
  }

  closeModal(){
    this.dialogRef.close(null)
  }
}
