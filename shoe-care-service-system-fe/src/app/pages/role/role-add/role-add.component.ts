import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {PermissionService} from '../../../services/permission.service';
import {DialogService} from "../../../services/dialog.service";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  roleForm: FormGroup;
  message: string = '';
  permissions: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private dialogService: DialogService
  ) {
    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      permissions: this.formBuilder.group({})
    });
  }

  ngOnInit() {
    this.loadPermissions();
  }

  onPermissionChange(permission: string, event: Event) {
    const permissionsGroup = this.roleForm.get('permissions') as FormGroup;
    const target = event.target as HTMLInputElement;
    if (target) {
      permissionsGroup.get(permission)?.setValue(target.checked);
    }
  }

  loadPermissions() {
    this.permissionService.getPermissions().subscribe({
      next: (data) => {
        this.permissions = data.result.map((permission: { name: string }) => permission.name);
        const permissionsGroup = this.roleForm.get('permissions') as FormGroup;
        this.permissions.forEach(permission => {
          permissionsGroup.addControl(permission, this.formBuilder.control(false));
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  addRole() {
    if (this.roleForm.valid) {
      const selectedPermissions = Object.keys(this.roleForm.value.permissions).filter(permission => this.roleForm.value.permissions[permission]);
      const roleData = {
        name: this.roleForm.value.name,
        description: this.roleForm.value.description,
        permissions: selectedPermissions
      };

      this.roleService.addRole(roleData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm vai trò thành công!', 'OK');
          this.roleForm.reset();
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
