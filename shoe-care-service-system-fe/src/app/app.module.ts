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
import {DialogService} from "./services/dialog.service";
import {MatDialogModule} from "@angular/material/dialog";
import { RoleAddComponent } from './pages/role/role-add/role-add.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UserEditComponent,
    RoleAddComponent,
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
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
