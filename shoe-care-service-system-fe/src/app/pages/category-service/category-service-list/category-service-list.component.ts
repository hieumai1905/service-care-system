import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {DialogService} from '../../../services/dialog.service';
import {NgForOf, SlicePipe} from "@angular/common";
import {CategoryServiceService} from "../../../services/category-service.service";
import {CategoryService} from "../../../model/CategoryService";

@Component({
  selector: 'app-category-service-list',
  templateUrl: './category-service-list.component.html',
  styleUrls: ['./category-service-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf
  ]
})
export class CategoryServiceListComponent implements OnInit {
  categories: CategoryService[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private categoryService: CategoryServiceService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
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
          this.categoryService.deleteCategory(id).subscribe({
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
