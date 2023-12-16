import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RequestClassSchedule, ResposneClassSchedule } from './config/class-schedule.model';
import { ResponseClassHistory } from './config/class-history.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddClassService {

  constructor(private http: HttpClient) { }

  getClassSchedule(dayId: number){
    return this.http.get<ResposneClassSchedule[]>(`${environment}/getClassByDayId/${dayId}`)
  }

  addClass(classValues: RequestClassSchedule){
    return this.http.post(`${environment}/addClassHistory/`, classValues)
  }

  getFullClassHistoryList(){
    return this.http.get<ResponseClassHistory[]>(`${environment}/classHistory`)
  }
}
