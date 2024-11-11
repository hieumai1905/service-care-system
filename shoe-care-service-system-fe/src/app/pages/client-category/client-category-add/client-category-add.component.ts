import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientCategoryService} from '../../../services/client-category.service';
import {DialogService} from '../../../services/dialog.service';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-client-category-add',
  templateUrl: './client-category-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./client-category-add.component.css']
})
export class ClientCategoryAddComponent implements OnInit {
  clientCategoryForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private clientCategoryService: ClientCategoryService,
    private dialogService: DialogService
  ) {
    this.clientCategoryForm = this.formBuilder.group({
      typeName: ['', [Validators.required, Validators.minLength(2)]],
      discount: [0, [Validators.required, Validators.min(1000)]],
      totalRequire: [0, [Validators.required, Validators.min(1000)]],
      note: [''],
      isPercent: [false],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.clientCategoryForm.get('isPercent')?.valueChanges.subscribe(isPercent => {
      this.onPercentChange(isPercent);
    });
  }

  onPercentChange(isPercent: boolean) {
    const discountControl = this.clientCategoryForm.get('discount');
    if (isPercent) {
      discountControl?.setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
    } else {
      discountControl?.setValidators([Validators.required, Validators.min(1000)]);
    }
    discountControl?.updateValueAndValidity();
  }

  addClientCategory() {
    if (this.clientCategoryForm.valid) {
      const clientCategoryData = this.clientCategoryForm.value;

      clientCategoryData.discountType = clientCategoryData.isPercent ? 'percent' : 'money';

      this.clientCategoryService.addClientCategory(clientCategoryData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm loại khách hàng thành công!', 'OK');
          this.clientCategoryForm.reset({isActive: true});
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
