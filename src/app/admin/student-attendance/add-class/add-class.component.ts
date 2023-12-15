import { Component, OnInit, signal } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AddClassService } from './add-class.service';
import { tap } from 'rxjs';
import { RequestClassSchedule, ResposneClassSchedule } from './config/class-schedule.model';
import { ResponseClassHistory } from './config/class-history.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit{

  displayedClassScheduleColumns: string[] = ['day', 'time', 'session', 'centerName', 'action'];
  displayedClassHistoryColumns: string[] = ['date', 'day', 'time', 'center', 'session', 'action'];
  classDate!: Date | null
  classSchedule: ResposneClassSchedule[] = []
  classHistory: ResponseClassHistory[] = []

  classDateSignal = signal<Date | null>(null)

  constructor(private service: AddClassService, private router: Router) {}

  ngOnInit(){
    this.getClassHistory()
  }


  searchClassDate() {

    if (this.classDate) {
      const dayId = this.getDayId(this.classDate)
      this.service.getClassSchedule(dayId).pipe(tap({
        next: (response) => {
          if (response.length > 0) {
            this.classSchedule = response
            console.log(this.classSchedule)
          } else {
            this.classSchedule = []
            this.classDate = null
            alert(`no class scheduled for today ${this.classDate}`)
          }
        }
      })).subscribe()

    }


  }

  getDayId(dateValue: Date): number {

    const date = new Date(dateValue)

    const dayOfWeekIndex = date.getDay()

    return dayOfWeekIndex
  }

  addClass(id: number) {

    if(this.classDate){

      const classDate = this.classDate.toISOString().slice(0, 10)
      const classId = id

      const addClassObjectRequest: RequestClassSchedule = {
        classId: classId,
        date: classDate
      }

      this.service.addClass(addClassObjectRequest).pipe(tap({
        next:  () => {
          alert('1 class record successfully added')
          this.getClassHistory()
        },
        error: (err) => {
          if(err.status === 403){
            alert("class already added into database, please navigate to class history")
          }
        }

      })).subscribe()
    }
  }


  getClassHistory(){
    this.service.getFullClassHistoryList().pipe((tap({
      next: (response) => {
        this.classHistory = response
      }
    }))).subscribe()
  }

  navigateToAttendance(classHistoryId: number){

    const classHistoryObject = this.classHistory.find((classHistory) => classHistory.id === classHistoryId)

    if(classHistoryObject){
      const objectString = JSON.stringify(classHistoryObject)
      localStorage.setItem('classAttendanceObject', objectString)
      this.router.navigate(['/admin/attendance', classHistoryId])
    }    
  }

  


}
