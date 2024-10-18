import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {UserService} from '../../../services/user.service';
import {Role} from "../../../model/Role";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  roles: Array<Role> = [];
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private dialogService: DialogService,
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
          this.dialogService.notificationOpen('Thông báo', 'Thêm người dùng thành công!', 'OK');
          this.userForm.reset();
        },
        error: (err) => {
          this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
        }
      });
    } else {
      this.message = 'Vui lòng điền đúng thông tin trong form.';
    }
  }
}
