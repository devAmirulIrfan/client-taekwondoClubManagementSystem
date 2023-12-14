import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { requestParentRecordForm, responseParentCenter, responseParentRecord, responseParentStatus } from './config/model-config/request-response-model-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentRecordManagementService {

  constructor(private http: HttpClient) { }

  getParentStatus(): Observable<responseParentStatus[]>{
    return this.http.get<responseParentStatus[]>('http://localhost:8080/getAllStatus')
  }

  getParentCenter(): Observable<responseParentCenter[]>{
    return this.http.get<responseParentCenter[]>('http://localhost:8080/centers')
  }

  getAllParent(): Observable<responseParentRecord[]>{
    return this.http.get<responseParentRecord[]>('http://localhost:8080/getAllParent')
  }

  getSingleParent(parentId: number): Observable<responseParentRecord>{
    return this.http.get<responseParentRecord>(`http://localhost:8080/getSingleParent/${parentId}`)
  }

  addParent(parentFormValues: requestParentRecordForm){
    console.log(parentFormValues)
    return this.http.post(`http://localhost:8080/addParent`, parentFormValues)
  }


  updateParent(parentId: number, parentFormValues: requestParentRecordForm){
    return this.http.put(`http://localhost:8080/updateParent/${parentId}`, parentFormValues)
  }


}
