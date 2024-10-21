import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../model/Client';
import {NgClass, NgForOf, SlicePipe} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    MatPaginatorModule,
    NgForOf,
    SlicePipe,
    RouterLink,
  ]
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  searchKey: string = '';

  constructor(private clientService: ClientService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log('Data:', data);
        this.clients = data.result;
        console.log('Loaded clients:', this.clients);
      },
      error: (err) => {
        console.error('Error when loading clients:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  searchClient() {
    if (this.searchKey.trim() === '') {
      this.loadClients();
      return;
    }
    this.clientService.searchClients(this.searchKey).subscribe({
      next: (data) => {
        this.clients = data.result;
        console.log('Searched clients:', this.clients);
      },
      error: (err) => {
        console.error('Error when searching clients:', err);
      }
    });
  }

  deleteClient(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa khách hàng',
        `Bạn có chắc chắn muốn xóa khách hàng này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.clientService.deleteClient(id).subscribe({
            next: () => {
              console.log('Client deleted:', id);
              this.loadClients();
              this.dialogService.notificationOpen('Thông báo', 'Xóa khách hàng thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
