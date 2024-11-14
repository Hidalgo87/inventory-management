import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, RouterLink,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  user;

  constructor(private router:Router, private userService: UserService){
    this.user = this.userService.getUser();

  }
  
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}

