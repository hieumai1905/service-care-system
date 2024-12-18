import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../../services/schedule.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {DialogService} from '../../../services/dialog.service';
import {Schedule} from "../../../model/Schedule";
import {DatePipe, NgClass, NgForOf, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css'],
  standalone: true,
  imports: [
    SlicePipe,
    NgClass,
    RouterLink,
    DatePipe,
    MatPaginatorModule,
    FormsModule,
    NgForOf
  ]
})
export class ScheduleListComponent implements OnInit {
  schedules: Schedule[] = [];
  scheduleFilters: Schedule[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  searchKey: string = '';
  selectedStatus: string = '';
  currentUser: any = null;

  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadSchedules();
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.currentUser = data.result;
        console.log('Current user:', this.currentUser);
      },
      error: (err) => {
        console.error('Error when load profile:', err);
      }
    });
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe({
      next: (data) => {
        this.schedules = data.result;
        this.filterSchedule();
      },
      error: (err) => console.error('Error loading schedules:', err)
    });
  }

  filterSchedule() {
    if (this.selectedStatus === '') {
      this.scheduleFilters = this.schedules;
    } else {
      this.scheduleFilters = this.schedules.filter(s => s.status === this.selectedStatus);
    }
  }

  hasDeleteSchedulePermission(): boolean {
    const permissions = this.currentUser.role.permissions;
    for (const permision in permissions) {
      if (permissions[permision].name === 'DELETE_SCHEDULE') {
        return true;
      }
    }
    return false;
  }

  searchSchedule() {
    if (this.searchKey.trim() === '') {
      this.loadSchedules();
      return;
    }
    this.scheduleService.searchSchedules(this.searchKey).subscribe({
      next: (data) => {
        this.schedules = data.result;
        this.filterSchedule();
      },
      error: (err) => console.error('Error searching schedules:', err)
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteSchedule(id: number) {
    this.dialogService
      .open('Xác nhận xóa lịch hẹn', 'Bạn có chắc chắn muốn xóa lịch hẹn này?', 'Xóa', 'Hủy')
      .subscribe(result => {
        if (result) {
          this.scheduleService.deleteSchedule(id).subscribe({
            next: () => {
              this.loadSchedules();
              this.dialogService.notificationOpen('Thông báo', 'Xóa lịch hẹn thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }

  getStatusClass(status: string): string {
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

  getStatus(status: string): string {
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
}
