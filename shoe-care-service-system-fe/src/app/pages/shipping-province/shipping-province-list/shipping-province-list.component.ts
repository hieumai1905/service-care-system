import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {DialogService} from "../../../services/dialog.service";
import {ShippingProvinceService} from "../../../services/shipping-province.service";
import {AuthService} from "../../../services/auth.service";
import {Province} from "../../../model/Province";

@Component({
  selector: 'app-shipping-province-list',
  templateUrl: './shipping-province-list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    MatPaginatorModule,
    SlicePipe,
    RouterLink,
    NgIf
  ]
})
export class ShippingProvinceListComponent implements OnInit {
  provinces: Province[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  currentUser: string | null = null;

  constructor(
    private shippingProvinceService: ShippingProvinceService,
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadProvinces();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadProvinces() {
    this.shippingProvinceService.getProvinces().subscribe({
      next: (data) => {
        this.provinces = data.result;
        console.log('Loaded provinces:', data);
      },
      error: (err) => {
        console.error('Error when loading provinces:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteProvince(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa thông tin phí ship',
        `Bạn có chắc chắn muốn xóa thông tin phí ship theo tỉnh thành này không?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.shippingProvinceService.deleteProvince(id).subscribe({
            next: () => {
              console.log('Province deleted:', id);
              this.loadProvinces();
              this.dialogService.notificationOpen('Thông báo', 'Xóa thông tin phí ship theo tỉnh thành thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
