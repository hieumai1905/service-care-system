import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsComponent} from './pages/products/products.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {AuthGuard} from "./services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./pages/login/login.component";
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {UserListComponent} from "./pages/users/user-list/user-list.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserEditComponent} from './pages/users/user-edit/user-edit.component';
import {ConfirmDialogService} from "./services/confirm-dialog.service";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsComponent,
    HttpClientModule,
    ReactiveFormsModule,
    LoginComponent,
    UserListComponent,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard,
    ConfirmDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
