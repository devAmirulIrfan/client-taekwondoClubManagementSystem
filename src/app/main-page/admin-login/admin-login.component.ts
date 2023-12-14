import { Component, OnInit } from '@angular/core';
import { adminLoginForm } from './config/form-config/form-model-config';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {tap, pipe} from 'rxjs'
import { requestAdminLoginFormModel } from './config/request-response-config/request-adminLoginForm-model';
import { AdminLoginService } from './config/service-config/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit{

  adminLoginForm!: FormGroup<adminLoginForm>

  constructor(private service: AdminLoginService, private router: Router){

  }

  ngOnInit(): void {
    this.formInitialization();

  }

  formInitialization(){
    this.adminLoginForm = new FormGroup<adminLoginForm>({
      username: new FormControl<string>(''),
      password: new FormControl<string>('')
    })
  }

  login() {
    console.log(this.adminLoginForm.value);
    this.service.login(this.getAdminLoginFormValues()).pipe(
      tap({
        next: () => {
          this.router.navigate(['/admin']); // Added a closing parenthesis
        },
        error: (response) => {
          console.log(response)
          console.log('Wrong username or password');
        }
      })
    ).subscribe();
  }  

  getAdminLoginFormValues(): requestAdminLoginFormModel{
    const adminLoginFormValues: requestAdminLoginFormModel = {
      username: this.adminLoginForm.controls.username.value,
      password: this.adminLoginForm.controls.password.value
    }
    return adminLoginFormValues
  }
  

}
