import { Routes } from '@angular/router';
import { ViewInventoryComponent } from './features/view-inventory/view-inventory.component';
import { CreateInventoryComponent } from './features/create-inventory/create-inventory.component';

export const routes: Routes = [
  { path: 'create', component: CreateInventoryComponent },
  { path: 'view', component: ViewInventoryComponent },
];
