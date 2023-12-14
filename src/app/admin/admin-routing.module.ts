import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRecordManagementComponent } from './student-record-management/student-record-management.component';
import { AdminComponent } from './admin.component';
import { ParentRecordManagementComponent } from './parent-record-management/parent-record-management.component';

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
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
