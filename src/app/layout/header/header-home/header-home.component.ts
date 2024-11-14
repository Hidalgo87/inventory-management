import { Component } from '@angular/core';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css',
})
export class HeaderHomeComponent {
  constructor(private router: Router) {}
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/view']);
    });
  }
}
