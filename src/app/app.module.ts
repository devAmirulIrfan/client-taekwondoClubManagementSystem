import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './main-page/admin-login/admin-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import { interceptor } from './config/http-interceptor/http-interceptor';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,

    MatTableModule
  ],
  bootstrap: [AppComponent],
  providers: [{  
    provide: HTTP_INTERCEPTORS,  
    useClass: interceptor,  
    multi: true  
  }]
})
export class AppModule { }
