import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {OrderService} from "../../services/order.service";
import {Client} from "../../model/Client";
import {Order} from "../../model/Order";
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    NgForOf,
    SlicePipe,
    NgClass,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  revenueToday: number = 0;
  revenueWeek: number = 0;
  orderLatest: Order[] = [];
  revenueTodayGrowthRate: number = 0;
  revenueWeekGrowthRate: number = 0;
  completionRatio: number = 0;
  totalOrders: number = 0;
  completedOrders: number = 0;

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.loadRevenueToday();
    this.loadRevenueWeek();
    this.loadOrderLatest();
    this.loadClientNew();
    this.loadCompletionRatio();
  }

  private loadRevenueToday(): void {
    const today = new Date();
    console.log(today);
    this.orderService.revenueByDay(today).subscribe({
      next: (data) => {
        this.revenueToday = data.result.todayRevenue;
        this.revenueTodayGrowthRate = data.result.growthRate;
      },
      error: (err) => {
        console.error('Error loading today\'s revenue:', err);
      }
    });
  }

  private loadOrderLatest() {
    this.orderService.getLatestOrders().subscribe({
      next: (data) => {
        this.orderLatest = data.result;
      },
      error: (err) => {
        console.error('Error when loading orders:', err);
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

  private loadClientNew() {

  }

  private loadRevenueWeek(): void {
    const today = new Date();
    this.orderService.revenueByWeek(today).subscribe({
      next: (data) => {
        this.revenueWeek = data.result.weekRevenue;
        this.revenueWeekGrowthRate = data.result.growthRate;
      },
      error: (err) => {
        console.error('Error loading this week\'s revenue:', err);
      }
    });
  }

  private loadCompletionRatio(): void {
    this.orderService.completeRadio().subscribe({
      next: (data) => {
        this.completionRatio = data.result.completionRatio;
        this.totalOrders = data.result.totalOrders;
        this.completedOrders = data.result.completedOrders;
      },
      error: (err) => {
        console.error("Error loading completion ratio:", err);
      },
    });
  }

  protected readonly Number = Number;
}
