import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { requestStudentRecordForm, responseStudentGrade, responseStudentParent, responseStudentRecord, responseStudentStatus, responseStudentCenter } from './student-record-management-modal/config/model-config/request-response-model-config';

@Injectable({
  providedIn: 'root'
})
export class StudentRecordManagementServiceService {

  constructor(private http: HttpClient) { }

  getAllStudent(): Observable<responseStudentRecord[]>{
    return this.http.get<responseStudentRecord[]>('http://localhost:8080/getAllStudent')
  }

  getAllGrade(): Observable<responseStudentGrade[]> {
    return this.http.get<responseStudentGrade[]>('http://localhost:8080/grades');
  }
  

  getAllParent(): Observable<responseStudentParent[]>{
    return this.http.get<responseStudentParent[]>('http://localhost:8080/getAllParent')
  }

  getAllStatus(): Observable<responseStudentStatus[]>{
    return this.http.get<responseStudentStatus[]>('http://localhost:8080/getAllStatus')
  }

  addStudent(studentRecordFormValue: requestStudentRecordForm){
    return this.http.post('http://localhost:8080/addStudent', studentRecordFormValue)
  }

  getStudentCenter(): Observable<responseStudentCenter[]>{
    return this.http.get<responseStudentCenter[]>('http://localhost:8080/centers')
  }

  getSingleStudent(id: number | null): Observable<responseStudentRecord>{
    return this.http.get<responseStudentRecord>(`http://localhost:8080/getSingleStudent/${id}`)
  }

  updateStudent(id: number, studentRecordFormValue: requestStudentRecordForm){
    return this.http.put<requestStudentRecordForm>(`http://localhost:8080/updateStudent/${id}`, studentRecordFormValue)
  }
}
