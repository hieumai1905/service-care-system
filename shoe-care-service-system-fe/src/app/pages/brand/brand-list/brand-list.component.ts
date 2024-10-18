import {Component, OnInit} from '@angular/core';
import {BrandService} from '../../../services/brand.service';
import {Router, RouterLink} from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {DialogService} from '../../../services/dialog.service';
import {Brand} from "../../../model/Brand";
import {NgForOf, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf
  ]
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private brandService: BrandService,
    private router: Router,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data.result;
        console.log('Loaded brands:', data);
      },
      error: (err) => {
        console.error('Error when loading brands:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteBrand(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa thương hiệu',
        `Bạn có chắc chắn muốn xóa thương hiệu này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.brandService.deleteBrand(id).subscribe({
            next: () => {
              console.log('Brand deleted:', id);
              this.loadBrands();
              this.dialogService.notificationOpen('Thông báo', 'Xóa thương hiệu thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
