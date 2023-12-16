import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { requestAdminLoginFormModel } from '../request-response-config/request-adminLoginForm-model';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  

  isLoggedIn = this._isLoggedIn$.asObservable()

  getToken(): any{
    if(localStorage.getItem('token') !== null){}
    return localStorage.getItem('token')
  }

  constructor( private http: HttpClient, private router: Router) { 
    const token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!token)
  }

  login(adminLoginFormData: requestAdminLoginFormModel){
    console.log(adminLoginFormData)
    return this.http.post(`${environment}/adminLogin`, adminLoginFormData ).pipe(
      tap((response: any) => {
        console.log(response)
        console.log(response.token)
        localStorage.setItem('token', response.token)
        this._isLoggedIn$.next(true);
      })
    
    )
  }

  logout(){
    localStorage.removeItem('token')
    this._isLoggedIn$.next(false)
  }

getStudent(){
  return this.http.get(`${environment}/getAllStudent`)
}
}
