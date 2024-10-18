import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogService} from '../../../services/dialog.service';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CategoryServiceService} from "../../../services/category-service.service";

@Component({
  selector: 'app-category-service-add',
  templateUrl: './category-service-add.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./category-service-add.component.css']
})
export class CategoryServiceAddComponent {
  categoryForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryServiceService,
    private dialogService: DialogService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  addCategory() {
    if (this.categoryForm.valid) {
      const categoryData = {
        name: this.categoryForm.value.name
      };

      this.categoryService.addCategory(categoryData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm danh mục dịch vụ thành công!', 'OK');
          this.categoryForm.reset();
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
