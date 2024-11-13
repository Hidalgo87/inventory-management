import { Component } from '@angular/core';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

}
