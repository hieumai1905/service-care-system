import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../services/role.service";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Role} from "../../../model/Role";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  standalone: true,
  styleUrls: ['./role-list.component.css'],
  imports: [
    DatePipe,
    NgForOf,
    MatPaginatorModule,
    SlicePipe,
    RouterLink,
    NgIf
  ]
})
export class RoleListComponent implements OnInit {
  roles: Array<Role> = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  currentUser: string | null = null;

  constructor(
    private readonly roleService: RoleService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadRoles();
    } else {
      this.router.navigate(['/login']);
    }
  }

  private

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data.result;
        console.log('Loaded roles:', data);
      },
      error: (err) => {
        console.error('Error when load roles:', err);
      }
    });
  }

  onPageChange(event
                 :
                 PageEvent
  ) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteRole(name
               :
               string
  ) {
    this.dialogService
      .open(
        'Xác nhận xóa vai trò',
        `Bạn có chắc chắn muốn xóa vai trò này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.roleService.deleteRole(name).subscribe({
            next: () => {
              console.log('Role deleted:', name);
              this.loadRoles();
              this.dialogService.notificationOpen('Thông báo', 'Xóa vai trò thành công!', 'OK');
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
