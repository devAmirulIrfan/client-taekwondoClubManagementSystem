import { AfterViewInit, Component, OnInit, Signal, ViewChild, inject, signal } from '@angular/core';
import { AddClassService } from '../add-class/add-class.service';
import { ResponseClassHistory } from '../add-class/config/class-history.model';
import { concatMap, debounceTime, distinctUntilChanged, finalize, from, of, switchMap, tap } from 'rxjs';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { AttendanceService } from './config/service/attendance.service';
import { ResponseStudent } from './config/model/response-student-model';
import { RequestStudentAttendance } from './config/model/request-student-attendance.model';
import { ResponseStudentAttendance } from './config/model/response-student-attendance.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, AfterViewInit{
  
  classInformation!: ResponseClassHistory

  qrValue = 0

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  studentName = ''

  studentInfo?: ResponseStudent[]

  studentAttendance?: ResponseStudentAttendance[] = []
  
  constructor(private service: AttendanceService){}

  displayedColumns: string[] = ['No', 'studentName', 'centerName', 'gradeName', 'parentName', 'action']

  


  ngOnInit(){

    this.getClassInfo()
    this.getAttendanceList()
  }

  ngAfterViewInit(): void {
    this.action.start()
  }

  getClassInfo(){
    const jsonData = localStorage.getItem('classAttendanceObject')
    jsonData ? this.classInformation = JSON.parse(jsonData) : null
  }


  getAttendanceList(){
    this.service.getClassAttendance(this.classInformation.date.slice(0,10), this.classInformation.id).pipe(
      tap({
        next: (response) => this.studentAttendance = response
      })
    ).subscribe()
  }


  handleScan(e: any, action?: any){

    const value = e[0].value

    if(value !== this.qrValue){
      console.log(value)
    }

    of(value).pipe(
      concatMap(() => of(this.action.stop())),
      concatMap(() => of(this.addAttendance(value))),
      finalize(() => this.action.start())
    ).subscribe()

  }


  handleSearch(){
    of(this.studentName).pipe(
      debounceTime(3000),
      switchMap((response) => {
        // Ensure to return the observable from the switchMap
        return this.service.searchStudentName(response);
      }),
      tap((response) => {
        console.log(response)
        this.studentInfo = response
      })
    ).subscribe();
  }

  addAttendance(studentId: number){

    const attendanceObject: RequestStudentAttendance = {
      date: this.classInformation?.date.toString().slice(0,10),
      classId: this.classInformation?.id,
      studentId: studentId
    }

    return this.service.addAttendance(attendanceObject).pipe(tap({
      next: (response) => {
        this.getAttendanceList()
      },

      error: (err) => {
        alert(err.error)
      }
    })
    ).subscribe()

  }


  deleteAttendance(attendanceId: number){

    this.service.deleteAttendance(attendanceId).pipe(tap({
      next: (response) => alert(response),
      error: (err) => alert(err)
    }),
    finalize(()  => this.getAttendanceList())
    ).subscribe()
  }


}
