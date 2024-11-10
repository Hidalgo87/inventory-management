import { Routes } from '@angular/router';
import { ViewInventoryComponent } from './features/view-inventory/view-inventory.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'create', component: CreateProductComponent },
  { path: 'view', component: ViewInventoryComponent },
  {path: '',redirectTo:'login',pathMatch:'full'}
];
