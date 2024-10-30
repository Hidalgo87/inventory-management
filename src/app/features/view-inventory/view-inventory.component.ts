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
export class ViewInventoryComponent {
  delete() {
    Swal.fire({
      text: '¿Está seguro que desea eliminar el producto?',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', // Rojo
      cancelButtonColor: '#007bff', // Azul
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado correctamente', '', 'success');
      }
    });
  }
}
