import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AddClassService } from './add-class.service';
import { tap } from 'rxjs';
import { ResposneClassSchedule } from './config/class-schedule.model';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {

  displayedColumns: string[] = ['day', 'time', 'centerName', 'action'];
  classDate?: Date | null
  classSchedule: ResposneClassSchedule[] = []

  constructor(private service: AddClassService) { }

  searchClassDate() {

    if (this.classDate) {
      const dayId = this.getDayId(this.classDate)
      this.service.getClassSchedule(dayId).pipe(tap({
        next: (response) => {
          if(response.length > 0){
            this.classSchedule = response
            console.log(this.classSchedule)
          }else{
            alert(`no class scheduled for today ${this.classDate}`)
            this.classSchedule = []
            this.classDate = null
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


}
