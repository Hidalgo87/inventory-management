import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/login_response.interface';
import { ProductItem } from '../../features/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSignal = signal<User>({userName:'', password:'', email:''});

  login(userName: string, password: string) :LoginResponse{
    const userSrt = localStorage.getItem(userName.toLowerCase().trim());
    if(!userSrt){
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    const user:User = JSON.parse(userSrt);
    if (user.password !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    this.setUser(user);
    return {
      success: true
    }

  }

  logout(){
    this.userSignal.set({userName:'',password:'',email:''});
    localStorage.removeItem('loggedUser');
  }

  register(user:User): SignUpResponse{
    if (localStorage.getItem(user.userName.toLowerCase().trim())) {
      return {
        success: false,
        message: 'Usuario ya existe'
      }
    }
    const userSrt = JSON.stringify(user);
    localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
    this.setUser(user);
    return {
      success: true
    }
  }

  private setUser(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }

  getUser(){
    const userSrt = localStorage.getItem('loggedUser');
    if(userSrt){
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }

  saveImage(id: string, name: string, description: string, price: number, quantity: number, url: string, userName: string) {
    const newProduct: ProductItem = {
      id,
      name,
      description,
      price,
      quantity,
      url
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

  getProducts(userName:string):ProductItem[]{
    let productStr = localStorage.getItem(`imgs-${userName}`);
    if(productStr){
      return JSON.parse(productStr);
    }
    return [];
  }
  


}
