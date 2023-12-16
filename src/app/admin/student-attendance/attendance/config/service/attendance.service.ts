import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseStudent } from '../model/response-student-model'
import { RequestStudentAttendance } from '../model/request-student-attendance.model';
import { ResponseStudentAttendance } from '../model/response-student-attendance.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  searchStudentName(getStudentByName: string){
    return this.http.get<ResponseStudent[]>(`${environment}/getStudentByName/${getStudentByName}`)
  }


  addAttendance(attendanceValues: RequestStudentAttendance){
    return this.http.post(`${environment}/addStudentAttendance/`, attendanceValues)
  }

  getClassAttendance(date: string, classId: number){
    return this.http.get<ResponseStudentAttendance[]>(`${environment}/getAttendanceList/${date}/${classId}`)
  }


  deleteAttendance(attendanceId: number){
    return this.http.delete(`${environment}/deleteStudentAttendance/${attendanceId}`,)
  }

}
