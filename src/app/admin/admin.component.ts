import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../main-page/admin-login/config/service-config/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  constructor(private service: AdminLoginService, private router: Router){}
  ngOnInit(): void {
  }

  logout(){
    this.service.logout()
    this.router.navigate(['../'])

  }


}
