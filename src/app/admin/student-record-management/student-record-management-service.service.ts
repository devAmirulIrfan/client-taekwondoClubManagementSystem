import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { requestStudentRecordForm, responseStudentGrade, responseStudentParent, responseStudentRecord, responseStudentStatus, responseStudentCenter } from './student-record-management-modal/config/model-config/request-response-model-config';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentRecordManagementServiceService {

  constructor(private http: HttpClient) { }

  getAllStudent(): Observable<responseStudentRecord[]>{
    return this.http.get<responseStudentRecord[]>(`${environment}/getAllStudent`)
  }

  getAllGrade(): Observable<responseStudentGrade[]> {
    return this.http.get<responseStudentGrade[]>(`${environment}/grades`);
  }
  

  getAllParent(): Observable<responseStudentParent[]>{
    return this.http.get<responseStudentParent[]>(`${environment}/getAllParent`)
  }

  getAllStatus(): Observable<responseStudentStatus[]>{
    return this.http.get<responseStudentStatus[]>(`${environment}/getAllStatus`)
  }

  addStudent(studentRecordFormValue: requestStudentRecordForm){
    return this.http.post(`${environment}/addStudent`, studentRecordFormValue)
  }

  getStudentCenter(): Observable<responseStudentCenter[]>{
    return this.http.get<responseStudentCenter[]>('${environment}/centers')
  }

  getSingleStudent(id: number | null): Observable<responseStudentRecord>{
    return this.http.get<responseStudentRecord>(`${environment}/getSingleStudent/${id}`)
  }

  updateStudent(id: number, studentRecordFormValue: requestStudentRecordForm){
    return this.http.put<requestStudentRecordForm>(`${environment}/updateStudent/${id}`, studentRecordFormValue)
  }
}
