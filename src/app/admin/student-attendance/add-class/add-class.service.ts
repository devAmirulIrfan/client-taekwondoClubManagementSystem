import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestClassSchedule, ResposneClassSchedule } from './config/class-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class AddClassService {

  constructor(private http: HttpClient) { }

  getClassSchedule(dayId: number){
    return this.http.get<ResposneClassSchedule[]>(`http://localhost:8080/getClassByDayId/${dayId}`)
  }

  addClass(classValues: RequestClassSchedule){
    return this.http.post(`http://localhost:8080/addClassHistory/`, classValues)
  }
}
