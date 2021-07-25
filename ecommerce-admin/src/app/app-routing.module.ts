import { ManageStatusComponent } from './manage-status/manage-status.component';
import { ProductListComponent } from './product-list/product-list.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';



const routes: Routes = [
  { path: '', component: AddProductComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'managestatus', component: ManageStatusComponent },
  { path: 'edit-product/:id', component: EditProductComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
