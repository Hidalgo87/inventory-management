import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderHomeComponent } from '../../layout/header/header-home/header-home.component';
import { ProductService } from '../services/product.service';
import { ProductItem } from '../interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    SidebarComponent,
    HeaderHomeComponent,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  product = signal<ProductItem>({
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    imagen: '',
  });
  file: File | undefined;
  uploadedUrl: string | null = null;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.route.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });
  }

  ngOnInit(): void {
    this.setCurrentProduct();
  }

  async setCurrentProduct() {
    const product = await this.productService.getProductById(this.id);
    console.log('product', product);
    this.product.set(product!);
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
    if (
      !this.product().nombre ||
      !this.product().descripcion ||
      !this.product().precio ||
      !this.product().cantidad
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
      let fileUrl = this.product().imagen; // Mantener la URL de la imagen si no se cambia

      // Subir nueva imagen solo si el usuario seleccionó una
      if (this.file) {
        fileUrl = (await this.productService.upload(
          this.file,
          this.product().nombre,
          fileName
        ))!;
        this.uploadedUrl = fileUrl;
      }

      // Preparar datos actualizados del producto
      const productData: ProductItem = {
        id: this.id,
        nombre: this.product().nombre,
        descripcion: this.product().descripcion,
        precio: this.product().precio,
        cantidad: this.product().cantidad,
        imagen: fileUrl,
      };

      const response = await this.productService.updateProduct(productData);
      console.log('response del update', response);

      Swal.fire(
        'Producto actualizado',
        'El producto se ha actualizado correctamente',
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
