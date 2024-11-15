import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),  
        animate('0.4s', style({ opacity: 1 }))  
      ])
    ])
  ]
})
export class AppComponent {
  title = 'inventory-management';

  // Cambia el tipo de 'outlet' a RouterOutlet
  getRouterOutletState(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }
}





