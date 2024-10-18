import {Component, OnInit} from '@angular/core';
import {MaterialService} from '../../../services/material.service';
import {Router, RouterLink} from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {DialogService} from '../../../services/dialog.service';
import {Material} from "../../../model/Material";
import {NgForOf, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    RouterLink,
    SlicePipe,
    NgForOf
  ]
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private materialService: MaterialService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.materialService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data.result;
        console.log('Loaded materials:', data);
      },
      error: (err) => {
        console.error('Error when loading materials:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteMaterial(id: number) {
    this.dialogService
      .open(
        'Xác nhận xóa vật liệu',
        `Bạn có chắc chắn muốn xóa vật liệu này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.materialService.deleteMaterial(id).subscribe({
            next: () => {
              console.log('Material deleted:', id);
              this.loadMaterials();
              this.dialogService.notificationOpen('Thông báo', 'Xóa chất liệu thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
