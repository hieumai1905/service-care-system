import {Component, OnInit} from '@angular/core';
import {OrderItem} from "../../../model/OrderItem";
import {PageEvent} from "@angular/material/paginator";
import {Client} from "../../../model/Client";
import {ClientService} from "../../../services/client.service";
import {DialogService} from "../../../services/dialog.service";
import {CouponItem} from "../../../model/CouponItem";
import {CouponItemService} from "../../../services/coupon-item.service";
import {OrderService} from "../../../services/order.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-order-cart-list',
  templateUrl: './order-cart-list.component.html',
  styleUrls: ['./order-cart-list.component.css']
})
export class OrderCartListComponent implements OnInit {
  carts: OrderItem[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  phoneSearch: string = '';
  clientSelected: Client | null = null;
  clients: Client[] = [];
  totalPrice: number = 0;
  discountValue: number = 0;
  couponCode: string = '';
  currentCoupon: CouponItem | null = null;
  messageCouponStatus: string = '';
  canOrder: boolean = false;
  paymentMethods = ['CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'MOBILE_WALLET'];
  selectedPaymentMethod: string = 'CASH';
  orderNote: string = '';
  currentUser: any = null;

  constructor(
    private clientService: ClientService,
    private dialogService: DialogService,
    private couponItemService: CouponItemService,
    private orderService: OrderService,
    private userService: UserService
  ) {
  }

  getDisplayName(paymentMethod: string): string {
    return paymentMethod.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  ngOnInit(): void {
    this.loadCart();
    this.loadClients();
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.currentUser = data.result;
      },
      error: (err) => {
        console.error('Error when load profile:', err);
      }
    });
  }

  loadCart(): void {
    const cartData = localStorage.getItem('carts');

    if (cartData) {
      this.carts = JSON.parse(cartData);
      console.log('Loaded carts:', this.carts);
      this.caculateTotalPrice();
    }
  }

  caculateTotalPrice() {
    this.totalPrice = this.carts.reduce((total, item) => total + item.totalPrice, 0);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log('Clients:', data);
        this.clients = data.result;
      },
      error: (err) => {
        console.error('Error when loading clients:', err);
      }
    });
  }

  deleteItem(i: number) {
    this.carts.splice(i, 1);
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  getClient() {
    if (this.phoneSearch.trim() === '') {
      return;
    }
    const foundClient = this.clients.find((client) => client.tel === this.phoneSearch);

    if (foundClient) {
      this.clientSelected = foundClient;
      this.canOrder = true;
    } else {
      this.dialogService.notificationOpen('Thông báo', 'Không tìm thấy khách hàng!');
    }
  }

  applyCoupon() {
    if (this.couponCode.trim() === '') {
      if (this.currentCoupon) {
        this.currentCoupon = null;
        this.discountValue = 0;
        this.messageCouponStatus = 'Loại bỏ mã giảm giá thành công!';
        return;
      }
      this.messageCouponStatus = 'Vui lòng nhập mã giảm!';
      return;
    }
    this.couponItemService.validateCouponItem(this.couponCode).subscribe({
      next: (data) => {
        this.currentCoupon = data.result;
        console.log('Current coupon:', this.currentCoupon);
        this.validateCoupon();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get finalPrice(): number{
    return this.totalPrice - this.discountValue - this.disCountClient
  }

  private validateCoupon() {
    if (!this.currentCoupon) {
      this.messageCouponStatus = 'Mã giảm giá không hợp lệ!';
      return;
    }
    if (!this.currentCoupon.coupon.isActive) {
      this.messageCouponStatus = 'Mã giảm giá đã hết hạn!';
      return;
    }
    if (this.currentCoupon.coupon.requireValue > this.totalPrice) {
      this.messageCouponStatus = 'Số tiền tối thiểu không đủ!';
      return;
    }
    if (this.currentCoupon.coupon.expireAt < new Date().toISOString()) {
      this.messageCouponStatus = 'Mã giảm giá đã hết hạn!';
      return;
    }
    if (!this.currentCoupon.active) {
      this.messageCouponStatus = 'Mã giảm giá đã được sử dụng!';
      return;
    }
    if (this.currentCoupon.coupon.isPercent) {
      this.discountValue = this.totalPrice * this.currentCoupon.coupon.discount / 100;
    } else {
      this.discountValue = this.currentCoupon.coupon.discount;
    }
    this.messageCouponStatus = 'Áp dụng mã giảm giá thành công!';
  }

  get disCountClient(): number {
    if (!this.clientSelected || this.clientSelected.clientCategoryTotalRequire >= this.totalPrice) {
      return 0;
    }
    return this.clientSelected.clientCategoryDiscountType === 'percent'
      ? this.totalPrice * this.clientSelected.clientCategoryDiscount / 100
      : this.clientSelected.clientCategoryDiscount;
  }

  saveOrder() {
    if (!this.clientSelected) {
      this.dialogService.notificationOpen('Thông báo', 'Vui lòng chọn khách hàng!');
      return;
    }

    const orderDetails = this.carts.map((item) => ({
      productDetailId: item.productDetailId,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      createdAt: new Date().toISOString(),
      total: this.finalPrice,
      discount: this.discountValue + this.disCountClient,
      paymentType: this.selectedPaymentMethod,
      note: this.orderNote,
      clientId: this.clientSelected.id,
      couponItemId: this.currentCoupon ? this.currentCoupon.coupon.id : null,
      userId: this.currentUser.id,
      orderDetails: orderDetails
    };
    console.log('Order data:', orderData);

    this.orderService.addOrder(orderData).subscribe({
      next: (response) => {
        console.log('Hóa đơn đã được lưu thành công:', response);
        this.dialogService.notificationOpen('Thông báo', 'Hóa đơn đã được lưu thành công!');
        this.resetCart();
      },
      error: (err) => {
        console.error('Có lỗi xảy ra khi lưu hóa đơn:', err);
        this.dialogService.notificationOpen('Thông báo', 'Đã có lỗi xảy ra khi lưu hóa đơn!');
      }
    });
  }

  private resetCart() {
    localStorage.removeItem('carts');
    this.carts = [];
    this.totalPrice = 0;
    this.discountValue = 0;
    this.currentCoupon = null;
    this.couponCode = '';
    this.clientSelected = null;
    this.phoneSearch = '';
    this.canOrder = false;
    this.orderNote = '';
  }
}
