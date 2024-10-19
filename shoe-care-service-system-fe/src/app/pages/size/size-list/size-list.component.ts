import {Component, OnInit} from '@angular/core';
import {SizeService} from '../../../services/size.service';
import {RouterLink} from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {DialogService} from '../../../services/dialog.service';
import {Size} from "../../../model/Size";
import {NgForOf, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-size-list',
  templateUrl: './size-list.component.html',
  styleUrls: ['./size-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf
  ]
})
export class SizeListComponent implements OnInit {
  sizes: Size[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private sizeService: SizeService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadSizes();
  }

  loadSizes() {
    this.sizeService.getSizes().subscribe({
      next: (data) => {
        this.sizes = data.result;
        console.log('Loaded sizes:', data);
      },
      error: (err) => {
        console.error('Error when loading sizes:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteSize(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa kích cỡ',
        `Bạn có chắc chắn muốn xóa kích cỡ này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.sizeService.deleteSize(id).subscribe({
            next: () => {
              console.log('Size deleted:', id);
              this.loadSizes();
              this.dialogService.notificationOpen('Thông báo', 'Xóa kích cỡ thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
