import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {PermissionService} from '../../../services/permission.service';
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  roleForm: FormGroup;
  message: string = '';
  permissions: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly dialogService: DialogService
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
          if (err.error.code == 1009) {
            this.dialogService.notificationOpen('Thông báo', 'Vai trò đã tồn tại!', 'OK');
            return;
          }
          this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
        }
      });
    } else {
      this.message = 'Vui lòng điền đúng thông tin trong form.';
    }
  }
}
