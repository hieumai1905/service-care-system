import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

}
