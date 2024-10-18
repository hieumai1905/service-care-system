import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {AuthGuard} from "./services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogService} from "./services/dialog.service";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
