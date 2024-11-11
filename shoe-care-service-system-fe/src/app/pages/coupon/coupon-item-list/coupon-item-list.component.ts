import {Component, OnInit} from '@angular/core';
import {CouponItemService} from '../../../services/coupon-item.service';
import {CouponItem} from '../../../model/CouponItem';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {NgClass, NgForOf, SlicePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-coupon-item-list',
  templateUrl: './coupon-item-list.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    MatPaginatorModule,
    SlicePipe,
    FormsModule
  ],
  styleUrls: ['./coupon-item-list.component.css']
})
export class CouponItemListComponent implements OnInit {
  couponItems: CouponItem[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  searchKey: string = '';

  constructor(private couponItemService: CouponItemService) {
  }

  ngOnInit() {
    this.loadCouponItems();
  }

  loadCouponItems() {
    this.couponItemService.getCouponItems().subscribe({
      next: (data) => {
        this.couponItems = data.result;
        console.log('Loaded coupon items:', this.couponItems);
      },
      error: (err) => {
        console.error('Error when loading coupon items:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  searchCouponItem() {
    if (this.searchKey.trim() === '') {
      this.loadCouponItems();
      return;
    }
    this.couponItemService.searchCouponItems(this.searchKey).subscribe({
      next: (data) => {
        this.couponItems = data.result;
        console.log('Searched coupon items:', this.couponItems);
      },
      error: (err) => {
        console.error('Error when searching coupon items:', err);
      }
    });
  }
}
