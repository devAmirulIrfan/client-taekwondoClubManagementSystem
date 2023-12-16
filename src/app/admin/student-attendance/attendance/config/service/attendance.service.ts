import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseStudent } from '../model/response-student-model'
import { RequestStudentAttendance } from '../model/request-student-attendance.model';
import { ResponseStudentAttendance } from '../model/response-student-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  searchStudentName(getStudentByName: string){
    return this.http.get<ResponseStudent[]>(`http://localhost:8080/getStudentByName/${getStudentByName}`)
  }


  addAttendance(attendanceValues: RequestStudentAttendance){
    return this.http.post(`http://localhost:8080/addStudentAttendance/`, attendanceValues)
  }

  getClassAttendance(date: string, classId: number){
    return this.http.get<ResponseStudentAttendance[]>(`http://localhost:8080/getAttendanceList/${date}/${classId}`,)
  }


  deleteAttendance(attendanceId: number){
    return this.http.delete(`http://localhost:8080/deleteStudentAttendance/${attendanceId}`,)
  }

}
