import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {DialogService} from "../../../services/dialog.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    MatPaginatorModule,
    SlicePipe,
    RouterLink,
    FormsModule
  ],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<User> = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  searchKey: string = '';
  currentUser: string | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly dialogService: DialogService,
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadUsers();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadUsers() {

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.result;
        console.log('Loaded users:', this.users);
      },
      error: (err) => {
        console.error('Error when load users:', err);
      }
    });
  }


  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  searchUser() {
    if (this.searchKey.trim() === '') {
      this.loadUsers();
      return;
    }
    this.userService.searchUser(this.searchKey).subscribe({
      next: (data) => {
        this.users = data.result;
        console.log('Loaded user search:', this.users);
      },
      error: (err) => {
        console.error('Error when load users:', err);
      }
    });
  }

  deleteUser(id: string) {
    this.dialogService
      .open(
        'Xác nhận xóa người dùng',
        `Bạn có chắc chắn muốn xóa người dùng này?`,
        'Xóa',
        'Không xóa'
      )
      .subscribe(result => {
        if (result) {
          this.userService.deleteUser(id).subscribe({
            next: (data) => {
              if (data.code === 0) {
                this.users = this.users.filter(u => u.id !== id);
                this.dialogService.notificationOpen('Thông báo', 'Xóa người dùng thành công!', 'OK');
                console.log('User deleted:', id);
              } else {
                this.dialogService.notificationOpen('Thông báo', data.message || 'Đã có lỗi xảy ra!', 'OK');
              }
            },
            error: (err) => {
              this.dialogService.notificationOpen('Thông báo', err.error.message || 'Đã có lỗi xảy ra!', 'OK');
            }
          });
        }
      });
  }
}
