import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.css',
})
export class ViewInventoryComponent {}
