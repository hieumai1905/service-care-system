import {Component, OnInit} from '@angular/core';
import {CouponService} from '../../../services/coupon.service';
import {DialogService} from '../../../services/dialog.service';
import {Coupon} from '../../../model/Coupon';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {RouterLink} from '@angular/router';
import {DatePipe, NgClass, NgForOf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf,
    NgClass,
    DatePipe
  ]
})
export class CouponListComponent implements OnInit {
  coupons: Coupon[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private couponService: CouponService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadCoupons();
  }

  loadCoupons() {
    this.couponService.getCoupons().subscribe({
      next: (data) => {
        this.coupons = data.result;
        console.log('Loaded coupons:', data);
      },
      error: (err) => {
        console.error('Error when loading coupons:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteCoupon(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa chương trình giảm giá',
        `Bạn có chắc chắn muốn xóa chương trình giảm giá này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.couponService.deleteCoupon(id).subscribe({
            next: () => {
              console.log('Coupon deleted:', id);
              this.loadCoupons();
              this.dialogService.notificationOpen('Thông báo', 'Xóa mã chương trình giảm giá thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
