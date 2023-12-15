import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { AddClassService } from '../add-class/add-class.service';
import { ResponseClassHistory } from '../add-class/config/class-history.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit{

  classInformation?: ResponseClassHistory
  


  ngOnInit(){
      this.getClassHistory()
  }

  getClassHistory(){
    const jsonData = localStorage.getItem('classAttendanceObject')
    jsonData ? this.classInformation = JSON.parse(jsonData) : null
  }



}
