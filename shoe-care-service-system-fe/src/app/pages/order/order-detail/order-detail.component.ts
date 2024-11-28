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
  isPrinting: boolean = false;
  orderId: number | undefined;
  orderCurrent: Order | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
  }

  togglePrint() {
    this.isPrinting = !this.isPrinting;
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

  cancelOrder() {
    this.dialogService
      .open(
        'Xác nhận hủy đơn hàng',
        `Bạn có chắc chắn muốn hủy đơn hàng này?`,
        'Hủy',
        'Không hủy'
      )
      .subscribe(result => {
        if (result && this.orderCurrent) {
          this.orderService.cancelOrder(this.orderCurrent.id).subscribe({
            next: (data) => {
              this.dialogService.notificationOpen('Thông báo', 'Đơn hàng đã được hủy thành công!', 'OK');
              this.orderCurrent!.status = 'CANCELED';
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Không thể hủy đơn hàng!', 'OK');
            }
          });
        }
      });
  }


  printInvoice(): void {
    const printContents = document.getElementById('invoice-print-section')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    } else {
      this.dialogService.notificationOpen(
        'Thông báo',
        'Không tìm thấy nội dung hóa đơn để in.',
        'OK'
      );
    }
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

  getPaymentMethod(paymentType: string): string {
    switch (paymentType) {
      case 'CASH':
        return 'Tiền mặt';
      case 'CREDIT_CARD':
        return 'Thẻ tín dụng';
      case 'BANK_TRANSFER':
        return 'Chuyển khoản ngân hàng';
      case 'MOBILE_WALLET':
        return 'Ví điện tử';
      default:
        return 'Không xác định';
    }
  }
}
