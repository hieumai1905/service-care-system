import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialService} from '../../../services/material.service';
import {DialogService} from '../../../services/dialog.service';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./material-add.component.css']
})
export class MaterialAddComponent {
  materialForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private materialService: MaterialService,
    private dialogService: DialogService
  ) {
    this.materialForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  addMaterial() {
    if (this.materialForm.valid) {
      const materialData = {
        name: this.materialForm.value.name
      };

      this.materialService.addMaterial(materialData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm chất liệu thành công!', 'OK');
          this.materialForm.reset();
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
