import {Component, OnInit} from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {RouterLink} from '@angular/router';
import {NgForOf, SlicePipe} from '@angular/common';
import {CategoryProductService} from '../../../services/category-product.service';
import {DialogService} from '../../../services/dialog.service';
import {CategoryProduct} from '../../../model/CategoryProduct';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.component.html',
  styleUrls: ['./category-product-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf
  ]
})
export class CategoryProductListComponent implements OnInit {
  categories: CategoryProduct[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private categoryProductService: CategoryProductService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryProductService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result;
        console.log('Loaded categories:', data);
      },
      error: (err) => {
        console.error('Error when loading categories:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteCategory(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa danh mục',
        `Bạn có chắc chắn muốn xóa danh mục này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.categoryProductService.deleteCategory(id).subscribe({
            next: () => {
              console.log('Category deleted:', id);
              this.loadCategories();
              this.dialogService.notificationOpen('Thông báo', 'Xóa danh mục thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
