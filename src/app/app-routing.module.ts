import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './main-page/admin-login/admin-login.component';
import { adminRouteGuard } from './config/route-guards/admin-route-guard';


const routes: Routes = [
  {path: '', component: AdminLoginComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminRouteGuard]
  },
  {path: '**', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [adminRouteGuard]
})
export class AppRoutingModule { }
