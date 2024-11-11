import {Component, OnInit} from '@angular/core';
import {ClientCategoryService} from '../../../services/client-category.service';
import {DialogService} from '../../../services/dialog.service';
import {ClientCategory} from '../../../model/ClientCategory';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {RouterLink} from '@angular/router';
import {NgClass, NgForOf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-client-category-list',
  templateUrl: './client-category-list.component.html',
  styleUrls: ['./client-category-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf,
    NgClass
  ]
})
export class ClientCategoryListComponent implements OnInit {
  clientCategories: ClientCategory[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private clientCategoryService: ClientCategoryService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadClientCategories();
  }

  loadClientCategories() {
    this.clientCategoryService.getClientCategories().subscribe({
      next: (data) => {
        this.clientCategories = data.result;
        console.log('Loaded client categories:', data);
      },
      error: (err) => {
        console.error('Error when loading client categories:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteClientCategory(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa phân loại khách hàng',
        `Bạn có chắc chắn muốn xóa phân loại khách hàng này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.clientCategoryService.deleteClientCategory(id).subscribe({
            next: () => {
              console.log('Client category deleted:', id);
              this.loadClientCategories();
              this.dialogService.notificationOpen('Thông báo', 'Xóa phân loại khách hàng thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
