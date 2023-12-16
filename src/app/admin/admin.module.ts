import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StudentRecordManagementComponent } from './student-record-management/student-record-management.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { StudentRecordManagementModalComponent } from './student-record-management/student-record-management-modal/student-record-management-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core'

import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { interceptor } from '../config/http-interceptor/http-interceptor';
import { ParentRecordManagementComponent } from './parent-record-management/parent-record-management.component';
import { ParentRecordManagementModalComponent } from './parent-record-management/parent-record-management-modal/parent-record-management-modal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { StudentRecordManagementQrModalComponent } from './student-record-management/student-record-management-qr-modal/student-record-management-qr-modal.component';
import { QRCodeModule } from 'angularx-qrcode';
import jsPDF from 'jspdf';
import { AddClassComponent } from './student-attendance/add-class/add-class.component';
import { AttendanceComponent } from './student-attendance/attendance/attendance.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import {MatExpansionModule} from '@angular/material/expansion';

// Necessary to solve the problem of losing internet connection
LOAD_WASM().subscribe();

@NgModule({
  declarations: [
    AdminComponent,
    StudentRecordManagementComponent,
    StudentRecordManagementModalComponent,
    ParentRecordManagementComponent,
    ParentRecordManagementModalComponent,
    StudentRecordManagementQrModalComponent,
    AddClassComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    QRCodeModule,
    NgxScannerQrcodeModule,
    MatExpansionModule

  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ms-MY'}]
})
export class AdminModule { }
