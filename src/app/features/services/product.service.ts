import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ProductItem } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.secret
    );
  }

  async upload(file: File, folderName: string, fileName: string) {
    const { error } = await this.supabase.storage
      .from('products')
      .upload(`${folderName}/${fileName}`, file);
    if (error) {
      alert(error.message);
      return;
    }
    const { data } = await this.supabase.storage
      .from('products')
      .getPublicUrl(`${folderName}/${fileName}`);
    console.log('data.publicUrl', data.publicUrl);
    return `${data.publicUrl}?t=${new Date().getTime()}`;
  }

  async getProducts() {
    await this.supabase.schema('public');
    return (await this.supabase.from('producto').select()).data;
  }

  async createProduct(product: ProductItem) {
    await this.supabase.from('producto').insert(product);
  }

  async deleteProduct(id: number) {
    await this.supabase.from('producto').delete().eq('id', id);
  }

  async getProductById(id: number) {
    return (await this.supabase.from('producto').select().eq('id', id))
      .data![0];
  }

  async updateProduct(product: ProductItem) {
    console.log('product.id', product.id);
    const { data, error } = await this.supabase
      .from('producto')
      .update({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        cantidad: product.cantidad,
        imagen: product.imagen,
      })
      .eq('id', product.id);
  }
}
