import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RequestClassSchedule, ResposneClassSchedule } from './config/class-schedule.model';
import { ResponseClassHistory } from './config/class-history.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddClassService {

  ObjectValue: ResponseClassHistory = {
    id: null,
    date: null,
    day: null,
    startTime: null,
    endTime: null,
    centerName: null,
    session: null
  }

  constructor(private http: HttpClient) { }

  getClassSchedule(dayId: number){
    return this.http.get<ResposneClassSchedule[]>(`http://localhost:8080/getClassByDayId/${dayId}`)
  }

  addClass(classValues: RequestClassSchedule){
    return this.http.post(`http://localhost:8080/addClassHistory/`, classValues)
  }

  getFullClassHistoryList(){
    return this.http.get<ResponseClassHistory[]>(`http://localhost:8080/classHistory`)
  }
}
