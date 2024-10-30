import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-inventory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-inventory.component.html',
  styleUrl: './create-inventory.component.css',
})
export class CreateInventoryComponent {
  name: string = '';
  description: string = '';
  quantity: number = 0;
  price: number = 0;
  file: File | undefined;

  onClick() {
    if (!this.name || !this.quantity || !this.description || !this.price) {
      //  TODO: || !this.file
      Swal.fire('Mal ahí', '', 'warning');
      return;
    }
    Swal.fire('Biennn', '', 'success');
  }
}
