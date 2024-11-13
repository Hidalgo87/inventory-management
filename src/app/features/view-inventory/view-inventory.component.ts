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
    private productService: ProductService
  ) {
    this.user = this.userService.getUser();
    this.products.set(this.userService.getProducts(this.user().userName));
    this.setProducts();
  }

  async setProducts() {
    const products = await this.productService.getProducts();
    this.products.set(products!);
  }
}
