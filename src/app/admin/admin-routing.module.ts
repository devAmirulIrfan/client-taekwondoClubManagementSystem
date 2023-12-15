import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRecordManagementComponent } from './student-record-management/student-record-management.component';
import { AdminComponent } from './admin.component';
import { ParentRecordManagementComponent } from './parent-record-management/parent-record-management.component';
import { AddClassComponent } from './student-attendance/add-class/add-class.component';
import { AttendanceComponent } from './student-attendance/attendance/attendance.component';

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    children: [
    {
      path: '', 
      component: StudentRecordManagementComponent
    },
    {
      path: 'parent-record-management', 
      component: ParentRecordManagementComponent
    },
    {
      path: 'student-record-management', 
      component: StudentRecordManagementComponent
    },
    {
      path: 'add-new-class',
      component: AddClassComponent
    },
    {
      path: 'attendance/:id',
      component: AttendanceComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
