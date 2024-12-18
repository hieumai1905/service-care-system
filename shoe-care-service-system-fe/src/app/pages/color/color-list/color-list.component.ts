import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../services/color.service';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DialogService } from '../../../services/dialog.service';
import { Color } from '../../../model/Color';
import {NgForOf, NgStyle, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf,
    NgStyle
  ]
})
export class ColorListComponent implements OnInit {
  colors: Color[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private colorService: ColorService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadColors();
  }

  loadColors() {
    this.colorService.getColors().subscribe({
      next: (data) => {
        this.colors = data.result;
        console.log('Loaded colors:', data);
      },
      error: (err) => {
        console.error('Error when loading colors:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteColor(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa màu sắc',
        `Bạn có chắc chắn muốn xóa màu sắc này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.colorService.deleteColor(id).subscribe({
            next: () => {
              console.log('Color deleted:', id);
              this.loadColors();
              this.dialogService.notificationOpen('Thông báo', 'Xóa màu sắc thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
