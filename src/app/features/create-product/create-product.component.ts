import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderHomeComponent } from '../../layout/header/header-home/header-home.component';
import { ProductService } from '../services/product.service';
import { UserService } from '../../auth/services/user.service';
import { ProductItem } from '../interfaces/product.interface';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    SidebarComponent,
    HeaderHomeComponent,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  name: string = '';
  description: string = '';
  quantity: number = 0;
  price: number = 0;
  file: File | undefined;
  uploadedUrl: string | null = null;
  category: string = '';

  user;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = userService.getUser();
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedUrl = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  async onClick(event: Event) {
    event.preventDefault();
    const response = await this.productService.getProducts();
    if (
      !this.name ||
      !this.description ||
      !this.price ||
      !this.quantity ||
      !this.file
    ) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      return;
    }

    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileName = uuidv4();
    try {
      const fileUrl = await this.productService.upload(
        this.file,
        this.name,
        fileName
      );

      this.uploadedUrl = fileUrl!;
      this.userService.saveImage(
        fileName,
        this.name,
        this.description,
        this.price,
        this.quantity,
        this.uploadedUrl,
        this.user().userName
      );

      const productData: ProductItem = {
        nombre: this.name,
        descripcion: this.description,
        precio: this.price,
        categoria: this.category,
        cantidad: this.quantity,
        imagen: this.uploadedUrl,
      };

      const response = await this.productService.createProduct(productData);
      Swal.fire(
        'Producto creado',
        'El producto se ha creado correctamente',
        'success'
      );
      this.router.navigateByUrl('/view');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Error', 'Ha ocurrido un error desconocido', 'error');
      }
    }
  }
}
