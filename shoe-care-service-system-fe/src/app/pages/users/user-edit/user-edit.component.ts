import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RoleService} from '../../../services/role.service';
import {DialogService} from "../../../services/dialog.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  message: string = '';
  userId: string = '';
  username: string = '';
  userEdit: any;
  roles: Array<{ name: string, description: string }> = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private dialogService: DialogService
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
      isActive: [
        true, [
          Validators.required]
      ],
      role: [
        '', [
          Validators.required]
      ]
    });
  }

  ngOnInit() {
    this.loadRoles();
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      if (this.userId) {
        this.loadUser(this.userId);
      }
    });

    this.userService.getProfile().subscribe({
      next: (data) => {
        this.username = data.result.username;
      },
      error: (err) => {
        console.error('Error when load profile:', err);
      }
    });
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

  loadUser(id: string) {
    this.userService.findById(id).subscribe({
      next: (data) => {
        const user = data.result;
        this.userEdit = user;
        this.userForm.patchValue({
          username: user.username,
          password: '',
          fullName: user.fullName,
          email: user.email,
          dob: user.dob,
          phone: user.phone,
          isActive: user.isActive,
          role: user.role ? user.role.name : 'USER'
        });
      },
      error: (err) => {
        console.error('Error loading user:', err);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.getRawValue();
      if (this.username === this.userEdit.username) {
        updatedUser.isActive = this.userEdit.isActive;
        updatedUser.role = this.userEdit.role.name;
      }
      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật người dùng thành công!', 'OK');
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
