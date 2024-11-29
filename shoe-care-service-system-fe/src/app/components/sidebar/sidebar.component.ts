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
}
