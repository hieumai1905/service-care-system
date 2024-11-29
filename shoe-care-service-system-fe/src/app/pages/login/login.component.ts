import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response: any) => {
          console.log('Login success:', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          if (error.error.code == 1005) {
            this.dialogService.notificationOpen('Thông báo', 'Tài khoản hoặc mật khẩu không chính xác');
          } else {
            this.dialogService.notificationOpen('Thông báo', 'Đã có lỗi xảy ra, vui lòng thử lại sau');
          }
        }
      )
      ;
    }
  }
}
