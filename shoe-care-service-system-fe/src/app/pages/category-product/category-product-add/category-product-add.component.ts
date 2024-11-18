import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {DialogService} from '../../../services/dialog.service';
import {CategoryProductService} from '../../../services/category-product.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-category-product-add',
  templateUrl: './category-product-add.component.html',
  standalone: true,
  styleUrls: ['./category-product-add.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ]
})
export class CategoryProductAddComponent {
  categoryForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoryProductService: CategoryProductService,
    private dialogService: DialogService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  addCategory() {
    if (this.categoryForm.valid) {
      const categoryData = {
        name: this.categoryForm.value.name
      };

      this.categoryProductService.addCategory(categoryData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Thêm danh mục sản phẩm thành công!', 'OK');
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
