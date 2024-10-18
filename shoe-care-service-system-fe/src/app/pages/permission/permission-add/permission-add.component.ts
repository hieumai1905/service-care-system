import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PermissionService} from '../../../services/permission.service';
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.css']
})
export class PermissionAddComponent {
  permissionForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private dialogService: DialogService
  ) {
    this.permissionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]]
    });
  }

  addPermission() {
    if (this.permissionForm.valid) {
      const permissionData = {
        name: this.permissionForm.value.name,
        description: this.permissionForm.value.description
      };

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
