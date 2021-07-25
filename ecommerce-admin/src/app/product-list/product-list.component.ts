import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productDetail: any;
  name: any;
  editForm: any = FormGroup;
  isSubmitted = false;

  constructor(private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  
    private productService: ProductService,
  
    private toastr: ToastrService,
    private router: Router

  ) { }


  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

  
    this.getProduct();
    this.editFormValidation();

  }

 
  editFormValidation() {
    this.editForm = this.fb.group({
      _id:[''],
      Status: ['', [Validators.required]],
       // photo: [''],
     
    } );
  }

  get f() { return this.editForm.controls; }

  //get Categories
  getProduct() {
    this.productService.getProducts().subscribe(res => {
      console.log(res)
      this.productDetail = res.products;

    })
  }

  deleteProduct(item) {

    let id = item._id
    this.productService.deleteProducts(id).subscribe(res => {
      console.log(res)
      this.getProduct();
      this.toastr.success(`${res.message}`, 'Product', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    })
  }

  

  openEdit(targetModal: any, item:any) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'md'
    });
    this.editForm.patchValue({
      _id: item._id,
      Status: item.Status
    })
  }
 

  
//edit data save
onSave() {
  this.isSubmitted=true
 if (this.editForm.value=="") {
   return;
 } else {

   //console.log(this.editForm?.value._id, this.photo);
 
  
 this.productService.updateProducts(this.editForm.value._id, this.editForm.value).subscribe(res=>{
   console.log("response ",res)
   if(res){
     this.ngOnInit();
     this.modalService.dismissAll();
 
     this.toastr.success(`${res.message}`, 'Status', {
       timeOut: 1500,
       progressBar: true,
       progressAnimation: 'increasing',
       positionClass: 'toast-top-right'
     });
    //  this.router.navigateByUrl('/admin/productlist')
   } 

 })

 }
 

}

}

