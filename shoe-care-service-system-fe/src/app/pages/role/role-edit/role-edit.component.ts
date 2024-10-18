import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {PermissionService} from '../../../services/permission.service';
import {DialogService} from '../../../services/dialog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  roleForm: FormGroup;
  message: string = '';
  permissions: string[] = [];
  roleName: string | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly dialogService: DialogService,
    private readonly route: ActivatedRoute
  ) {
    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      permissions: this.formBuilder.group({})
    });
  }

  ngOnInit() {
    this.roleName = this.route.snapshot.paramMap.get('name') || '';
    this.loadPermissions();
    this.loadRoleDetails();
  }

  loadPermissions() {
    this.permissionService.getPermissions().subscribe({
      next: (data) => {
        if (data.code === 0) {
          this.permissions = data.result.map((permission: { name: string }) => permission.name);
          const permissionsGroup = this.roleForm.get('permissions') as FormGroup;
          this.permissions.forEach(permission => {
            permissionsGroup.addControl(permission, this.formBuilder.control(false));
          });
        } else {
          console.error('Error: Invalid response code', data.code);
        }
      },
      error: (err) => {
        console.error('Error when load permissions:', err);
      }
    });
  }

  loadRoleDetails() {
    if (!this.roleName) {
      return;
    }
    this.roleService.findByName(this.roleName).subscribe({
      next: (data) => {
        this.roleForm.patchValue({
          name: data.result.name,
          description: data.result.description
        });
        const currentPermissions = data.result.permissions.map((perm: any) => perm.name);

        const permissionsGroup = this.roleForm.get('permissions') as FormGroup;
        this.permissions.forEach(permission => {

          const isChecked = currentPermissions.includes(permission);
          permissionsGroup.get(permission)?.setValue(isChecked);
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  onPermissionChange(permission: string, event: Event) {
    const permissionsGroup = this.roleForm.get('permissions') as FormGroup;
    const target = event.target as HTMLInputElement;
    if (target) {
      permissionsGroup.get(permission)?.setValue(target.checked);
    }
  }

  updateRole() {
    if (this.roleForm.valid && this.roleName) {
      const selectedPermissions = Object.keys(this.roleForm.value.permissions).filter(permission => this.roleForm.value.permissions[permission]);
      const roleData = {
        name: this.roleForm.value.name,
        description: this.roleForm.value.description,
        permissions: selectedPermissions
      };

      this.roleService.updateRole(this.roleName, roleData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật vai trò thành công!', 'OK');
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
