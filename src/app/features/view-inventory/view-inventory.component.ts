import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HeaderHomeComponent } from '../../layout/header/header-home/header-home.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../interfaces/product.interface';
import { UserService } from '../../auth/services/user.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeaderHomeComponent,
    SidebarComponent,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
  ],
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.css',
})
export class ViewInventoryComponent {
  user;
  products = signal<ProductItem[]>([]);

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router
  ) {
    this.user = this.userService.getUser();
    this.setCurrentProducts();
  }

  async setCurrentProducts() {
    const products = await this.productService.getProducts();
    this.products.set(products!);
  }

  onEditProduct(product_id: number) {
    this.router.navigateByUrl(`/edit/${product_id}`);
  }

  async onDeleteProduct(product_id: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await this.productService.deleteProduct(product_id);
        Swal.fire('Eliminado con éxito', '', 'success');
        this.setCurrentProducts();
      } catch (error) {
        Swal.fire('Error al eliminar', '', 'error');
      }
    }
  }
}
