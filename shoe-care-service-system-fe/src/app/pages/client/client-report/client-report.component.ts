import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../model/Client';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ReportClient} from "../../../model/ReportClient";
import {Order} from "../../../model/Order";
import {OrderService} from "../../../services/order.service";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-client-report',
    templateUrl: './client-report.component.html',
    standalone: true,
    imports: [
        CurrencyPipe,
        NgIf,
        DatePipe,
        DecimalPipe,
        SlicePipe,
        NgClass,
        RouterLink,
        MatPaginatorModule,
        NgForOf
    ],
    styleUrls: ['./client-report.component.css']
})
export class ClientReportComponent implements OnInit {
    client: Client | null = null;
    clientId: string = '';
    report: ReportClient | null = null;
    orderHistory: Order[] = [];
    pageIndex: number = 0;
    pageSize: number = 5;

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private orderService: OrderService
    ) {
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

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.clientId = params.get('id') || '';
            if (this.clientId) {
                this.loadClient(Number(this.clientId));
            }
        });
        this.loadReport();
        this.loadOrders();
    }

    private loadClient(id: number): void {
        this.clientService.findById(id).subscribe({
            next: (data) => {
                this.client = data.result;
                console.log('client:', this.client);
            },
            error: (err) => {
                console.error('Error loading client:', err);
            }
        });
    }

    private loadReport() {
        this.clientService.reportClient(this.clientId).subscribe({
            next: (data) => {
                this.report = data.result;
                console.log('Report client:', this.report);
            },
            error: (err) => {
                console.error('Error loading client:', err);
            }
        });
    }

    private loadOrders() {
        this.orderService.getOrdersByClientId(Number(this.clientId)).subscribe({
            next: (data) => {
                this.orderHistory = data.result;
                console.log('Order history:', this.orderHistory);
            },
            error: (err) => {
                console.error('Error loading order history:', err);
            }
        });
    }
}
