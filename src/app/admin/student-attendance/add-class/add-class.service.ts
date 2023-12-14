import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResposneClassSchedule } from './config/class-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class AddClassService {

  constructor(private http: HttpClient) { }

  getClassSchedule(dayId: number){
    return this.http.get<ResposneClassSchedule[]>(`http://localhost:8080/getClassByDayId/${dayId}`)
  }
}
