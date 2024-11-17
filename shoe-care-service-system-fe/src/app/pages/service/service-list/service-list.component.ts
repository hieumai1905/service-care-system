import {Component, OnInit} from '@angular/core';
import {Service} from '../../../model/Service';
import {DialogService} from '../../../services/dialog.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {CurrencyPipe, NgClass, NgForOf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ServiceCareService} from "../../../services/service-care.service";
import {FormsModule} from "@angular/forms";
import {D} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  standalone: true,
  imports: [
    NgClass,
    MatPaginatorModule,
    NgForOf,
    SlicePipe,
    RouterLink,
    FormsModule,
    CurrencyPipe,
  ]
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  searchKey: string = '';

  constructor(
    private serviceService: ServiceCareService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data.result;
        console.log('Loaded services:', this.services);
      },
      error: (err) => {
        console.error('Error when loading services:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  searchService() {
    if (this.searchKey.trim() === '') {
      this.loadServices();
      return;
    }
    this.serviceService.searchServices(this.searchKey).subscribe({
      next: (data) => {
        this.services = data.result;
        console.log('Searched services:', this.services);
      },
      error: (err) => {
        console.error('Error when searching services:', err);
      }
    });
  }

  deleteService(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa dịch vụ',
        `Bạn có chắc chắn muốn xóa dịch vụ này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe((result) => {
        if (result) {
          this.serviceService.deleteService(id).subscribe({
            next: () => {
              console.log('Service deleted:', id);
              this.loadServices();
              this.dialogService.notificationOpen(
                'Thông báo',
                'Xóa dịch vụ thành công!',
                'OK'
              );
            },
            error: (err) => {
              this.dialogService.notificationOpen(
                'Thông báo',
                err.error.message || 'Đã có lỗi xảy ra!',
                'OK'
              );
            }
          });
        }
      });
  }

  protected readonly D = D;
}
