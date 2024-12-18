import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Schedule} from "../../../model/Schedule";
import {Service} from "../../../model/Service";
import {ScheduleService} from "../../../services/schedule.service";
import {ServiceCareService} from "../../../services/service-care.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-detail.component.html',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    NgForOf,
    NgIf,
    NgClass,
    RouterLink
  ],
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  scheduleId: number | undefined;
  scheduleCurrent: Schedule | undefined;
  services: Service[] = [];
  serviceSchedule: Service[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private servicesService: ServiceCareService
  ) {
  }

  ngOnInit() {
    this.scheduleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadServices();
    this.loadSchedule();
    this.findServiceOfSchedule();
  }

  private findServiceOfSchedule() {
    if (this.scheduleCurrent === undefined) {
      return;
    }
    const listServiceIds = this.scheduleCurrent.scheduleDetailShoeServiceAsString.split(',').map(Number);
    this.serviceSchedule = this.services.filter(service => listServiceIds.includes(service.id));
    console.log('Service schedule:', this.serviceSchedule);
  }


  private loadSchedule() {
    if (this.scheduleId === undefined) {
      return;
    }
    this.scheduleService.findById(this.scheduleId).subscribe({
      next: (data) => {
        this.scheduleCurrent = data.result;
        this.findServiceOfSchedule();
        console.log('Loaded schedule:', this.scheduleCurrent);
      },
      error: (err) => {
        console.error('Error when loading schedule:', err);
      }
    });
  }

  loadServices() {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data.result;
        console.log('Loaded services:', this.services);
      },
      error: (err) => {
        console.error('Error when loading services:', err);
      }
    });
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

  printInvoice() {
    const printContents = document.getElementById('invoice-print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }

  private getStatusMessage(targetStatus: string): string {
    switch (targetStatus) {
      case 'IN_PROGRESS':
        return 'Bạn có chắc chắn muốn bắt đầu xử lý đơn hàng?';
      case 'COMPLETED':
        return 'Bạn có chắc chắn muốn hoàn thành đơn hàng?';
      case 'RETURNED':
        return 'Bạn có chắc chắn muốn trả lại đơn hàng?';
      default:
        return 'Bạn có chắc chắn muốn thực hiện hành động này?';
    }
  }

  updateScheduleStatus(targetStatus: string) {
    this.dialogService
      .open(
        'Xác nhận tiến hành xử lý đơn hàng',
        this.getStatusMessage(targetStatus),
        'Xác nhận',
        'Hủy'
      )
      .subscribe(result => {
        if (result && this.scheduleCurrent) {
          this.scheduleService.updateStatus(this.scheduleCurrent.id, targetStatus).subscribe({
            next: () => {
              this.dialogService.notificationOpen(
                'Thông báo',
                'Cập nhật trạng thái đơn hàng thành công!',
                'OK'
              );
              this.loadSchedule();
              console.log('Updated schedule:', this.scheduleCurrent);
            },
            error: (err) => {
              this.dialogService.notificationOpen(
                'Thông báo',
                err.error.message || 'Không thể cập nhật trạng thái đơn hàng!',
                'OK'
              );
            }
          });
        }
      });
  }
}
