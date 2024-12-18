import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {OrderService} from "../../services/order.service";
import {Client} from "../../model/Client";
import {Order} from "../../model/Order";
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../model/Schedule";

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
  scheduleLatest: Schedule[] = [];

  constructor(
    private orderService: OrderService,
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
    this.loadRevenueToday();
    this.loadRevenueWeek();
    this.loadOrderLatest();
    this.loadCompletionRatio();
    this.loadScheduleLatest();
  }

  private loadScheduleLatest() {
    this.scheduleService.getSchedules().subscribe({
      next: (data) => {
        this.scheduleLatest = data.result;
        this.scheduleLatest = this.scheduleLatest.slice(0, 5);
      },
      error: (err) => {
        console.error('Error when loading latest schedules:', err);
      }
    });
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

  getStatusClassA(status: string): string {
    switch (status) {
      case 'CREATED':
        return 'status-created';
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'COMPLETED':
        return 'status-completed';
      case 'RETURNED':
        return 'status-returned';
      default:
        return '';
    }
  }

  getStatusA(status: string): string {
    switch (status) {
      case 'CREATED':
        return 'Đã tạo';
      case 'IN_PROGRESS':
        return 'Đang xử lý';
      case 'COMPLETED':
        return 'Đã hoàn thành';
      case 'RETURNED':
        return 'Đã trả khách';
      default:
        return 'Không xác định';
    }
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
