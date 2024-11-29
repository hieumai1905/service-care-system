import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PermissionService} from '../../../services/permission.service';
import {DialogService} from "../../../services/dialog.service";
import {Role} from "../../../model/Role";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.css']
})
export class PermissionAddComponent implements OnInit {
  permissionForm: FormGroup;
  message: string = '';
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private dialogService: DialogService,
    private roleService: RoleService
  ) {
    this.permissionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadRoles();
  }

  private loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        console.log('Loaded roles:', data);
        this.roles = data.result;
      },
      error: (err) => {
        console.error('Error when loading roles:', err);
      }
    });
  }

  addPermission() {
    if (this.permissionForm.valid) {
      const permissionData = {
        name: this.permissionForm.value.name,
        description: this.permissionForm.value.description,
        roleName: this.permissionForm.value.role
      };

      console.log('Permission data:', permissionData);

      this.permissionService.addPermission(permissionData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm quyền thành công!', 'OK');
          this.permissionForm.reset();
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
