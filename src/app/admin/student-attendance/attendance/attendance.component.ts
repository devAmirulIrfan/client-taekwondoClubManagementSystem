import { AfterViewInit, Component, OnInit, Signal, ViewChild, inject, signal } from '@angular/core';
import { AddClassService } from '../add-class/add-class.service';
import { ResponseClassHistory } from '../add-class/config/class-history.model';
import { catchError, concatMap, debounceTime, distinctUntilChanged, finalize, from, of, switchMap, tap, throwError } from 'rxjs';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { AttendanceService } from './config/service/attendance.service';
import { ResponseStudent } from './config/model/response-student-model';
import { RequestStudentAttendance } from './config/model/request-student-attendance.model';
import { ResponseStudentAttendance } from './config/model/response-student-attendance.model';
import { requestAttendanceList } from './config/model/request-attendance-list.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit{
  
  classInformation!: ResponseClassHistory

  qrValue = 0

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  studentName = ''

  studentInfo?: ResponseStudent[]

  studentAttendance?: ResponseStudentAttendance[] = []
  
  constructor(
    private service: AttendanceService,
    private route: ActivatedRoute
    ){}

  displayedColumns: string[] = ['No', 'studentName', 'centerName', 'gradeName', 'parentName', 'action']

  


  ngOnInit() {
    this.route.queryParams.pipe(
      tap((queryParams) => {

        const queryParamsObject: ResponseClassHistory = {
        id: queryParams['id'],
        date: queryParams['date'],
        day: queryParams['day'],
        centerName: queryParams['center'],
        session: queryParams['session'],
        startTime: queryParams['startTime'],
        endTime: queryParams['endTime'],
        }
        
        this.classInformation = queryParamsObject
      }),
      concatMap(() => this.getAttendanceList(this.classInformation.date, this.classInformation.id))
    ).subscribe()
  }


  getAttendanceList(date: string, classHistoryId: number){

    return this.service.getClassAttendance(date, classHistoryId).pipe(
      tap({
        next: (response) => this.studentAttendance = response,
        error: (err) => console.log(err)
      })
    )
  }


  handleScan(e: any, action?: any){

    const value: number = e[0].value

    this.action.stop()
    
    this.addAttendance(value)

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
      classHistoryId: this.classInformation?.id,
      studentId: studentId
    }

    this.service.addAttendance(attendanceObject).pipe(
      concatMap(() => this.getAttendanceList(this.classInformation.date, this.classInformation.id)),
      tap(() => {alert('1 student record successfully added')
    }), // Log success
      catchError((error) => {
        alert(error.error)
        return of(null); // Re-throw the error to propagate it to the outer observable
      }),
      finalize(() => this.action.stop()? this.action.start(): null)
    ).subscribe()

  }


  deleteAttendance(attendanceId: number){

    this.service.deleteAttendance(attendanceId).pipe(
      concatMap(() => this.getAttendanceList(this.classInformation.date, this.classInformation.id)),
      tap(() => alert('1 student record successfully delted')), // Log success
      catchError((error) => {
        console.error('The Error:', error); // Log error
        // Handle the error as needed
        return of(null); // Re-throw the error to propagate it to the outer observable
      })
    ).subscribe();
  }


}
