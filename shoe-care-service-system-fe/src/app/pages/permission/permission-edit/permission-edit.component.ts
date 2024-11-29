import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PermissionService} from '../../../services/permission.service';
import {DialogService} from '../../../services/dialog.service';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from "../../../services/role.service";
import {Role} from "../../../model/Role";

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.css']
})
export class PermissionEditComponent implements OnInit {
  permissionForm: FormGroup;
  message: string = '';
  permissionName: string | undefined;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    this.permissionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.permissionName = this.route.snapshot.paramMap.get('name') || '';
    this.loadPermissionDetails();
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

  loadPermissionDetails() {
    if (!this.permissionName) {
      return;
    }
    this.permissionService.findByName(this.permissionName).subscribe({
      next: (data) => {
        console.log(data);
        this.permissionForm.patchValue({
          name: data.result.name,
          description: data.result.description,
          role: data.result.roleName
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  updatePermission() {
    if (this.permissionForm.valid && this.permissionName) {
      const permissionData = {
        name: this.permissionForm.value.name,
        description: this.permissionForm.value.description,
        roleName: this.permissionForm.value.role
      };

      this.permissionService.updatePermission(this.permissionName, permissionData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật quyền hạn thành công!', 'OK');
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
