import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../../services/dialog.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryProductService } from "../../../services/category-product.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-category-product-edit',
  templateUrl: './category-product-edit.component.html',
  standalone: true,
  styleUrls: ['./category-product-edit.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ]
})
export class CategoryProductEditComponent implements OnInit {
  categoryForm: FormGroup;
  message: string = '';
  categoryId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoryProductService: CategoryProductService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategoryProductDetails();
  }

  loadCategoryProductDetails() {
    if (this.categoryId === undefined) {
      return;
    }
    this.categoryProductService.findById(this.categoryId).subscribe({
      next: (data) => {
        this.categoryForm.patchValue({
          name: data.result.name
        });
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
  }

  updateCategory() {
    if (this.categoryForm.valid && this.categoryId !== undefined) {
      const categoryData = {
        id: this.categoryId,
        name: this.categoryForm.value.name
      };

      this.categoryProductService.updateCategory(categoryData).subscribe({
        next: () => {
          this.dialogService.notificationOpen('Thông báo', 'Cập nhật danh mục sản phẩm thành công!', 'OK');
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
