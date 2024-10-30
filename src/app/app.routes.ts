import { Routes } from '@angular/router';
import { ViewInventoryComponent } from './features/view-inventory/view-inventory.component';
import { CreateProductComponent } from './features/create-product/create-product.component';

export const routes: Routes = [
  { path: 'create', component: CreateProductComponent },
  { path: 'view', component: ViewInventoryComponent },
];
