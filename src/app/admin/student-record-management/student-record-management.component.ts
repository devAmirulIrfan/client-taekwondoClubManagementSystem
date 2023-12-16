import { Component, OnInit, ViewChild} from '@angular/core';
import { StudentRecordManagementServiceService } from './student-record-management-service.service';
import { StudentRecordManagementQrModalComponent } from './student-record-management-qr-modal/student-record-management-qr-modal.component';
import { StudentRecordManagementModalComponent } from './student-record-management-modal/student-record-management-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { requestStudentRecordForm, responseStudentCenter, responseStudentGrade, responseStudentParent, responseStudentRecord, responseStudentStatus } from './student-record-management-modal/config/model-config/request-response-model-config';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-student-record-management',
  templateUrl: './student-record-management.component.html',
  styleUrls: ['./student-record-management.component.scss']
})
export class StudentRecordManagementComponent implements OnInit{

@ViewChild(MatPaginator) paginator!: MatPaginator;

 gradeRecord: responseStudentGrade[] = []

 parentRecord: responseStudentParent[] = []

 statusList: responseStudentStatus[] = []

  studentList!: responseStudentRecord[]

  centerList?: responseStudentCenter[]

  rowCount = 0

  paginatedStudentListData: any = []

  displayedColumns: string[] = ['id', 'studentName', 'birthDate', 'studentCenter', 'studentBelt', 'parentName', 'contactNo', 'status', 'action'];
  
  studentNameSearch = ''
  parentNameSearch = ''

  isAllGradeChecked = false
  isAllCenterChecked = false

  gradeCheckbox: any = {
    name: 'All',
    completed: false,
    color: 'primary',
    grades: []
  }

  centerCheckbox: any = {
    name: 'All',
    completed: false,
    color: 'primary',
    centers: []
  }

  allComplete: boolean = false;

  filterStudentRecord(): responseStudentRecord[]{

    let filteredStudentRecord = [...this.studentList] 

    //GET STUDENT BASED ON  STUDENT NAME KEWYWORD
    const searchedStudentNameKeywWordAfterWhiteSpaceTrim = this.studentNameSearch.replace(/\s+/g, '')

    searchedStudentNameKeywWordAfterWhiteSpaceTrim.length > 0 ? filteredStudentRecord = [...this.studentList.filter(student => student.studentName.toLocaleLowerCase().includes(this.studentNameSearch))] : null

    //GET STUDENT BASED ON PARENT NAME
    const searchedParentNameKeywWordAfterWhiteSpaceTrim = this.parentNameSearch.replace(/\s+/g, '')

    searchedParentNameKeywWordAfterWhiteSpaceTrim.length > 0 ? filteredStudentRecord = [...this.studentList.filter(student => student.parentName.toLocaleLowerCase().includes(this.parentNameSearch))] : null


    // GET STUDENT BASED ON GRADE
    const getCheckedGrade = this.gradeCheckbox.grades.filter((grade: { checked: any; }) => grade.checked)

    const getCheckedGradeId = [...getCheckedGrade.map((grade: { id: number; }) => grade.id)]


    filteredStudentRecord = [...filteredStudentRecord.filter(studentRecord => getCheckedGradeId.includes(studentRecord.gradeId))]
    


    //GET STUDENT BASED ON CENTER
    const getCheckedCenter = this.centerCheckbox.centers.filter((center: { checked: any; }) => center.checked)

    const getCheckedCenterId = [...getCheckedCenter.map((center: { id: number; }) => center.id)]

    filteredStudentRecord = [...filteredStudentRecord.filter(studentRecord => getCheckedCenterId.includes(studentRecord.centerId))]

  


    // RETURN THE FILTERED VALUE
    return filteredStudentRecord

  }
  handlePage(event?: any) {

    let startIndex: number
    let endIndex: number
    let studentRecord: responseStudentRecord[]

    const revertToFirstPage = 0

    if(event.pageIndex && event.pageSize){
      startIndex = event.pageIndex * event.pageSize;
      endIndex = startIndex + event.pageSize;
    }
    else{
      this.paginator.pageIndex = revertToFirstPage
      startIndex = 0 ;
      endIndex =  10;
    }

    studentRecord = this.filterStudentRecord()
    this.paginatedStudentListData = [...studentRecord.slice(startIndex, endIndex)]
    this.rowCount = studentRecord.length
  }

  constructor(private service: StudentRecordManagementServiceService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getAllStudentRecord()
    this.getAllGradeRecord()
    this.getAllParentRecord()
    this.getAllStatus()
    this.getAllCenterRecord()
  }

  getAllStudentRecord(){
    this.service.getAllStudent().pipe().subscribe((response) => {
      this.studentList = response 
      this.studentList.length > 10 ? this.paginatedStudentListData = [...this.studentList.slice(0,10)] : this.paginatedStudentListData = [...this.studentList]
      this.rowCount = this.studentList.length
    })
  }
  
  openStudentManagementRecordModal(action: number, studentId: number | null): void {

    const dialogRef = this.dialog.open(StudentRecordManagementModalComponent, ({data: this.processModalData(action, studentId)}))

    dialogRef.afterClosed().subscribe(result => {this.saveDataAfterCloseModal(result)});
  }

  openStudentManagementQrRecordModal(studentId: number, studentName: string, centerName: string, contactNo: string, parentName: string){
    
    const dialogRef = this.dialog.open(StudentRecordManagementQrModalComponent, ({data: this.processQrCodeModal(studentId, studentName, centerName, contactNo, parentName)}))
    dialogRef.afterClosed().subscribe()
  }

  processQrCodeModal(studentId: number, studentName: string, centerName: string, contactNo: string, parentName: string){
    console.log('student id', studentId)
    return {
      studentId: studentId,
      studentName: studentName,
      centerName: centerName,
      contactNo: contactNo,
      parentName: parentName
    }
  }

  processModalData(action: number, studentId: number | null): any{

    const addStudent = 1, updateStudent = 2

    if(action === addStudent) return {mode: "Add", gradeRecord: this.gradeRecord, parentRecord: this.parentRecord, statusList: this.statusList}

    if(action === updateStudent) return {mode: "Update", gradeRecord: this.gradeRecord, parentRecord: this.parentRecord, statusList: this.statusList, studentId: studentId}
    
  }

  saveDataAfterCloseModal(result: any){
    if(result){
      result.mode === "Add" ? this.addStudent(result.formValue) : this.updateStudent(result.studentId, result.formValue)
    }
  }

  getAllParentRecord(){
    this.service.getAllParent().pipe().subscribe((response) => {
      this.parentRecord = response
    })
  }

  getAllCenterRecord(){
    this.service.getStudentCenter().pipe().subscribe((response) => {
    this.centerList = response
    this.modifyCenterCheckboxObjectValues(this.centerList)
    })
  }

  modifyCenterCheckboxObjectValues(centerList: responseStudentCenter[]){
    const modifiedCenterRecordObject = centerList.map(center => {
      return {
        ...center,
        checked: false,
        color: "Ascent"
      }
    })
    this.centerCheckbox.centers = modifiedCenterRecordObject
    console.log('the checkbox', this.centerCheckbox)
  }

  setAllCenterCheckedOrUnchecked(allChecked: boolean){
    if(allChecked){
      this.centerCheckbox.centers.forEach((center: { checked: boolean; }) => center.checked = true)
      this.isAllCenterChecked = true
    }
    else{
      this.centerCheckbox.centers.forEach((center: { checked: boolean; }) => center.checked = false)
      this.isAllCenterChecked = false
    }
  }

  checkIfAllCenterChecked(){
    this.isAllCenterChecked = this.centerCheckbox.centers !== null && this.centerCheckbox.centers.every((center: { checked: boolean }) => center.checked === true)
  }

  checkCenters(){
    this.checkIfAllCenterChecked()
  }


  getAllGradeRecord(){
    this.service.getAllGrade().pipe().subscribe((response) => {
      this.gradeRecord = response
      this.modifyGradeCheckboxObjectValues()

    })
  }

  modifyGradeCheckboxObjectValues(){
    const modifiedGradeRecordObject: responseStudentGrade[] = this.gradeRecord.map(grade => {
      return {
        ...grade,
        checked: false,
        color: "Ascent"
      };
    });
    this.gradeCheckbox.grades = modifiedGradeRecordObject
    console.log(this.gradeCheckbox)
  }

  setAllGradeCheckedOrUnchecked(allChecked: boolean){
    if(allChecked){
      this.gradeCheckbox.grades.forEach((grade: { checked: boolean; }) => grade.checked = true)
      this.isAllGradeChecked = true
    }
    else{
      this.gradeCheckbox.grades.forEach((grade: { checked: boolean; }) => grade.checked = false)
      this.isAllGradeChecked = true
      }
}
  

  checkIfAllGradeChecked(){
    this.isAllGradeChecked =  this.gradeCheckbox.grades.every((grade: { checked: boolean }) => grade.checked === true)
  }

  checkGrades(){
    this.checkIfAllGradeChecked()
  }

  getAllStatus(){
    this.service.getAllStatus().pipe().subscribe((response) => {
      this.statusList = response
    })
  }

  addStudent(studentRecordFormData: requestStudentRecordForm){
    this.service.addStudent(studentRecordFormData).pipe(tap({
      next: () => {
        alert("1 Student record created")
        this.getAllStudentRecord()
      },
      error: (err) => {
        alert(err)
      }
    })).subscribe();
  }

  updateStudent(studentId: number, studentRecordFormValues: requestStudentRecordForm){
    this.service.updateStudent(studentId, studentRecordFormValues).pipe(tap({
      next: () => {
        alert("Student Record updated")
        this.getAllStudentRecord()
      },
      error: (err) => {
        alert(err)
      }
    })).subscribe()
  }

}
