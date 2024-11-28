import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../model/Order";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId: number | undefined;
  orderCurrent: Order | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder();
  }

  private loadOrder() {
    if (this.orderId === undefined) {
      return;
    }

    this.orderService.findById(this.orderId).subscribe({
      next: (data) => {
        this.orderCurrent = data.result;
        console.log('Current order:', this.orderCurrent);
      },
      error: (err) => {
        this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
      }
    });
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
}
