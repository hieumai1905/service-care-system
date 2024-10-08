import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  roles: Array<{ name: string, description: string }> = [];
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userForm = this.formBuilder.group({
      username: [
        '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/)]
      ],
      password: [
        '', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)]
      ],
      email: [
        '', [
          Validators.required,
          Validators.email]
      ],
      fullName: [
        '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]
      ],
      dob: [
        '', [
          Validators.required]
      ],
      phone: [
        '', [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[0-9]+$/)]
      ],
      role: [
        '', [
          Validators.required]
      ]
    });
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data.result;
        console.log('Roles loaded:', this.roles);
      },
      error: (err) => {
        console.error('Error loading roles:', err);
      }
    });
  }

  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: () => {
          this.message = 'Thêm người dùng thành công!';
          this.userForm.reset();
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.message = `${err.error.message}`;
          } else {
            this.message = 'Đã có lỗi xảy ra, vui lòng thử lại sau!';
          }
        }
      });
    } else {
      this.message = 'Vui lòng điền đúng thông tin trong form.';
    }
  }
}
