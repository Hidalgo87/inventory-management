import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HeaderHomeComponent } from '../../layout/header/header-home/header-home.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [FormsModule,
    HeaderHomeComponent, 
    SidebarComponent,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule],
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.css',
})
export class ViewInventoryComponent {
  delete() {
    Swal.fire({
      text: '¿Está seguro que desea eliminar el producto?',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#007bff', 
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado correctamente', '', 'success');
      }
    });
  }
}
