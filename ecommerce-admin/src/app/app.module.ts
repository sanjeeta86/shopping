import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { ToastrModule } from 'ngx-toastr';

import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './authconfig.interceptor';

import { NgxPaginationModule } from 'ngx-pagination';

import { NgxEchartsModule } from 'ngx-echarts';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { Ng2OrderModule } from 'ng2-order-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ProductService } from './product.service';
import { ManageStatusComponent } from './manage-status/manage-status.component';




@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductListComponent,
    EditProductComponent,
    ManageStatusComponent
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    NgxEchartsModule,
    ToastrModule.forRoot()


  ],
  providers: [
   
    ProductService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
