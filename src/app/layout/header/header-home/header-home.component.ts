import { Component } from '@angular/core';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

}
