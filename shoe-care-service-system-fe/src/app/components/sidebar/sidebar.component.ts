import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: any = null;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
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

  hasConfigurationPermission(): boolean {
    const permissions = this.currentUser.role.permissions;
    for (const permision in permissions) {
      if (permissions[permision].name === 'CONFIGURATION') {
        return true;
      }
    }
    return false;
  }

  hasUserManagementPermission(): boolean {
    const permissions = this.currentUser.role.permissions;
    for (const permision in permissions) {
      if (permissions[permision].name === 'USER_MANAGEMENT') {
        return true;
      }
    }
    return false;
  }

  hasClientCategoryPermission(): boolean {
    const permissions = this.currentUser.role.permissions;
    for (const permision in permissions) {
      if (permissions[permision].name === 'CLENT_CATEGORY_MANAGEMENT') {
        return true;
      }
    }
    return false;
  }
}
