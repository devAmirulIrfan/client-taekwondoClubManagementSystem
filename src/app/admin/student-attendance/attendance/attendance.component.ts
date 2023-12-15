import { AfterViewInit, Component, OnInit, Signal, ViewChild, inject, signal } from '@angular/core';
import { AddClassService } from '../add-class/add-class.service';
import { ResponseClassHistory } from '../add-class/config/class-history.model';
import { tap } from 'rxjs';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, AfterViewInit{
  
  classInformation?: ResponseClassHistory

  qrValue = 0

  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  


  ngOnInit(){
    this.getClassHistory()
  }

  ngAfterViewInit(): void {
    this.action.start()
  }

  getClassHistory(){
    const jsonData = localStorage.getItem('classAttendanceObject')
    jsonData ? this.classInformation = JSON.parse(jsonData) : null
  }


  handleScan(e: any, action?: any){

    const value = e[0].value

    if(value !== this.qrValue){
      console.log(value)
    }

    this.action.stop()
  }


}
