import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import Chart from 'chart.js/auto';
import {RevenueService} from "../../../services/revenue.service";

@Component({
    selector: 'app-revenue-report',
    templateUrl: './revenue-report.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule],
    styleUrls: ['./revenue-report.component.css']
})
export class RevenueReportComponent implements OnInit {
    @ViewChild('revenueChart', {static: true}) revenueChart!: ElementRef;

    public chart: Chart | null = null;
    public timeFrame: string = 'lastSevenDays';
    public startDate: string = '';
    public endDate: string = '';

    private chartData = {
        lastSevenDays: {
            labels: [] as string[],
            data: [] as number[],
            label: 'Doanh thu 7 ngày gần nhất',
            color: 'rgb(75, 192, 192)'
        },
        custom: {
            labels: [] as string[],
            data: [] as number[],
            label: 'Doanh thu tùy chọn',
            color: 'rgb(255, 99, 132)'
        }
    };

    constructor(private revenueService: RevenueService) {
    }

    ngOnInit(): void {
        this.loadLastSevenDaysRevenue();
    }

    private loadLastSevenDaysRevenue(): void {
        this.revenueService.getLastSevenDaysRevenue().subscribe(revenueData => {
            const today = new Date();
            const labels: string[] = [];
            const data: number[] = [];

            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const formattedDate = this.formatDate(date);
                const apiFormattedDate = this.formatAPIDate(date);

                const matchingRevenue = revenueData.find(item =>
                    Object.keys(item)[0] === apiFormattedDate
                );

                labels.push(formattedDate);
                data.push(matchingRevenue ? Object.values(matchingRevenue)[0] : 0);
            }

            this.chartData.lastSevenDays = {
                ...this.chartData.lastSevenDays,
                labels,
                data
            };

            this.createChart();
        });
    }

    private formatDate(date: Date): string {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    private formatAPIDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private createChart(): void {
        const ctx = this.revenueChart.nativeElement.getContext('2d');
        const currentData = this.timeFrame === 'custom'
            ? this.chartData.custom
            : this.chartData[this.timeFrame as keyof typeof this.chartData];

        if (!currentData.labels.length) {
            console.warn('No data available for the selected time frame.');
            return;
        }

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: currentData.labels,
                datasets: [{
                    label: currentData.label,
                    data: currentData.data,
                    borderColor: currentData.color,
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Doanh thu (VND)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Thời gian'
                        }
                    }
                }
            }
        });
    }

    onTimeFrameChange(): void {
        if (this.timeFrame === 'lastSevenDays') {
            this.loadLastSevenDaysRevenue();
        } else {
            this.getCustomDateRangeData();
        }
    }

    onDateRangeChange(): void {
        if (this.timeFrame === 'custom' && this.startDate && this.endDate) {
            this.getCustomDateRangeData();
        }
    }

    private getCustomDateRangeData(): void {
        if (!this.startDate || !this.endDate) {
            this.chartData.custom = {labels: [], data: [], label: 'Doanh thu tùy chọn', color: 'rgb(255, 99, 132)'};
            this.createChart();
            return;
        }

        const labels: string[] = [];
        const data: number[] = [];

        this.revenueService.getRevenueByDateRange(this.startDate, this.endDate).subscribe(revenueData => {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            for (let i = 0; i <= diffDays; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                const apiFormattedDate = this.formatAPIDate(date);

                const matchingRevenue = revenueData.find(item =>
                    Object.keys(item)[0] === apiFormattedDate
                );

                labels.push(this.formatDate(date));
                data.push(matchingRevenue ? Object.values(matchingRevenue)[0] : 0);
            }

            this.chartData.custom = {
                labels,
                data,
                label: 'Doanh thu tùy chọn',
                color: 'rgb(255, 99, 132)'
            };

            this.createChart();
        });
    }
}
