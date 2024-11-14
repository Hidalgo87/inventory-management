import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {
  LoginResponse,
  SignUpResponse,
} from '../interfaces/login_response.interface';
import { ProductItem } from '../../features/interfaces/product.interface';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignal = signal<User>({ userName: '', password: '', email: '' });
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.secret
    );
  }

  async login(userName: string, password: string): Promise<LoginResponse> {
    const { data, error } = await this.supabase
      .from('administrador')
      .select()
      .eq('userName', userName.toLowerCase().trim());
    const user: User = data![0];
    if (!user) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }
    if (user.password !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }
    this.setUser(user);
    return {
      success: true,
    };
  }

  logout() {
    this.userSignal.set({ userName: '', password: '', email: '' });
    localStorage.removeItem('loggedUser');
  }

  async register(user: User): Promise<SignUpResponse> {
    const { data, error } = await this.supabase
      .from('administrador')
      .select()
      .eq('userName', user.userName.toLowerCase().trim());
    console.log('data', data);
    if (data![0]) {
      return {
        success: false,
        message: 'Usuario ya existe',
      };
    }
    console.log('user', user);
    await this.supabase.from('administrador').insert({
      userName: user.userName.toLowerCase().trim(),
      email: user.email,
      password: user.password,
    });
    this.setUser(user);
    return {
      success: true,
    };
  }

  private setUser(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }

  getUser() {
    const userSrt = localStorage.getItem('loggedUser');
    if (userSrt) {
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }

  saveImage(
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    url: string,
    userName: string
  ) {
    const newProduct = {
      id,
      name,
      description,
      price,
      quantity,
      url,
    };

    let galleryStr = localStorage.getItem(`imgs-${userName}`);
    if (galleryStr) {
      let gallery = JSON.parse(galleryStr);
      gallery = [...gallery, newProduct];
      localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
    } else {
      localStorage.setItem(`imgs-${userName}`, JSON.stringify([newProduct]));
    }
  }

  getProducts(userName: string): ProductItem[] {
    let productStr = localStorage.getItem(`imgs-${userName}`);
    if (productStr) {
      return JSON.parse(productStr);
    }
    return [];
  }
}
