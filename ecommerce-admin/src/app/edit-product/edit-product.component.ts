
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
 

  submitted: boolean;
  product = new Product();
  Media: any;

  // brand = new Brand();
  constructor(
    private spinner: NgxSpinnerService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);


    // category id
     const pro_id = this.activeRoute.snapshot.params.id
     
     this.productService.getSingleProductsById(pro_id).subscribe(res => {
       console.log(res)
       this.product = res;
    
     })

  }



 

  SelectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Media = file;

    }
  }


 


   onSubmit() {
    this.submitted = true;
 


    let id = this.product._id;
    console.log(id, this.product)

    this.productService.updateProducts(id, this.product).subscribe(res => {
       console.log(res)
        if(this.Media) {

          let id = this.product._id;

          this.productService.updateProductswithSinglePhoto(id,this.Media).subscribe(res => {
            this.toast.success(`${res.message}`, 'Product', {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.router.navigateByUrl('/admin/productlist')
            })

         }else {
            this.toast.success(`${res.message}`, 'Product', {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
           this.router.navigateByUrl('/admin/productlist')

         }
      
 

     })


   


   }





}
