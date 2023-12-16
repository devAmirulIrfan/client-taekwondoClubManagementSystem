import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { requestParentRecordForm, responseParentCenter, responseParentRecord, responseParentStatus } from './config/model-config/request-response-model-config';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentRecordManagementService {

  constructor(private http: HttpClient) { }

  getParentStatus(): Observable<responseParentStatus[]>{
    return this.http.get<responseParentStatus[]>(`${environment}/getAllStatus`)
  }

  getParentCenter(): Observable<responseParentCenter[]>{
    return this.http.get<responseParentCenter[]>(`${environment}/centers`)
  }

  getAllParent(): Observable<responseParentRecord[]>{
    return this.http.get<responseParentRecord[]>(`${environment}/getAllParent`)
  }

  getSingleParent(parentId: number): Observable<responseParentRecord>{
    return this.http.get<responseParentRecord>(`${environment}/getSingleParent/${parentId}`)
  }

  addParent(parentFormValues: requestParentRecordForm){
    console.log(parentFormValues)
    return this.http.post(`${environment}/addParent`, parentFormValues)
  }


  updateParent(parentId: number, parentFormValues: requestParentRecordForm){
    return this.http.put(`${environment}/updateParent/${parentId}`, parentFormValues)
  }


}
