// order-list.component.ts
import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {RouterLink} from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {DialogService} from '../../../services/dialog.service';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Order} from "../../../model/Order";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  standalone: true,
  styleUrls: ['./order-list.component.css'],
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgIf
  ]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  searchKey: string = '';
  selectedStatus: string = '';
  orderFilers: Order[] = [];
  currentUser: any = null;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.currentUser = data.result;
        console.log('Current user:', this.currentUser);
      },
      error: (err) => {
        console.error('Error when load profile:', err);
      }
    });
    this.loadOrders();
  }

  filterOrder() {
    if (this.selectedStatus == '') {
      this.orderFilers = this.orders;
    } else {
      this.orderFilers = this.orders.filter(order => order.status == this.selectedStatus);
    }
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data.result;
        console.log('Loaded orders:', data);
        this.filterOrder();
      },
      error: (err) => {
        console.error('Error when loading orders:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'status-completed';
      case 'CANCELED':
        return 'status-canceled';
      case 'REFUNDED':
        return 'status-refunded';
      case 'DELETED':
        return 'status-deleted';
      default:
        return '';
    }
  }

  getStatus(status: string) {
    switch (status) {
      case 'COMPLETED':
        return 'Đã hoàn thành';
      case 'CANCELED':
        return 'Đã hủy';
      case 'REFUNDED':
        return 'Đã hoàn tiền';
      case 'DELETED':
        return 'Đã xóa';
      default:
        return '';
    }
  }

  deleteOrder(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa đơn hàng',
        `Bạn có chắc chắn muốn xóa đơn hàng này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.orderService.deleteOrder(id).subscribe({
            next: () => {
              console.log('Order deleted:', id);
              this.loadOrders();
              this.dialogService.notificationOpen('Thông báo', 'Xóa đơn hàng thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }

  searchOrder() {
    if (this.searchKey.trim() === '') {
      this.loadOrders();
      return;
    }
    this.orderService.searchOrder(this.searchKey).subscribe({
      next: (data) => {
        this.orders = data.result;
        console.log('Loaded order search:', this.orders);
        this.filterOrder();
      },
      error: (err) => {
        console.error('Error searching orders:', err);
      }
    });
  }

  hasDeleteOrderPermission(): boolean {
    const permissions = this.currentUser.role.permissions;
    for (const permision in permissions) {
      if (permissions[permision].name === 'DELETE_ORDER') {
        return true;
      }
    }
    return false;
  }
}
