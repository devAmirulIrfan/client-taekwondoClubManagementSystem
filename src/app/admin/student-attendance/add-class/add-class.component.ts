import { Component, signal } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AddClassService } from './add-class.service';
import { tap } from 'rxjs';
import { RequestClassSchedule, ResposneClassSchedule } from './config/class-schedule.model';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {

  displayedColumns: string[] = ['day', 'time', 'session', 'centerName', 'action'];
  classDate!: Date | null
  classSchedule: ResposneClassSchedule[] = []

  classDateSignal = signal<Date | null>(null)

  constructor(private service: AddClassService) { }

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
        next: (response) => console.log(response),
        error: (err) => {
          if(err.status === 403){
            alert("class already added into database, please navigate to class history")
          }
        }

      })).subscribe()
    }
  }

  


}
