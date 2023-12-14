import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AdminLoginService } from "../../main-page/admin-login/config/service-config/admin-login.service";
import { Router } from "@angular/router";

@Injectable()
export class adminRouteGuard implements CanActivate {
  
    constructor(private guard: AdminLoginService, private router: Router){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree { 
    return this.guard.isLoggedIn.pipe(
        tap((loggedIn: boolean) => {
            if(!loggedIn) this.router.navigate([''])
        })
    )
  }
}