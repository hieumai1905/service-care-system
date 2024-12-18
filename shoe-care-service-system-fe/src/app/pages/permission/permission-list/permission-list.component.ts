import {Component, OnInit} from '@angular/core';
import {PermissionService} from "../../../services/permission.service";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Permission} from "../../../model/Permission";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css'],
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    MatPaginatorModule,
    SlicePipe,
    RouterLink,
    NgIf
  ]
})
export class PermissionListComponent implements OnInit {
  permissions: Array<Permission> = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  currentUser: string | null = null;

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadPermissions();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadPermissions() {
    this.permissionService.getPermissions().subscribe({
      next: (data) => {
        this.permissions = data.result;
        console.log('Loaded permissions:', data);
      },
      error: (err) => {
        console.error('Error when loading permissions:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deletePermission(name: string) {
    this.dialogService
      .open(
        'Xác nhận xóa quyền',
        `Bạn có chắc chắn muốn xóa quyền này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.permissionService.deletePermission(name).subscribe({
            next: () => {
              console.log('Permission deleted:', name);
              this.loadPermissions();
              this.dialogService.notificationOpen('Thông báo', 'Xóa quyền thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
