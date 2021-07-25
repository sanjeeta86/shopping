
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../product.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  submitted: boolean;
  
  addproductForm: FormGroup;
  Media: any;
  
  
  constructor( private productService: ProductService,
   
    private toastr: ToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    ) {
      this.productForm();
    }
    productForm() {
      this.addproductForm = this.fb.group({
        Title: ['', [Validators.required]],
        Status: ['', [Validators.required]],
        Description:['',[Validators.required]],
        Media: ['', [Validators.required]],
       
      })
  
    }
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }
 

  get f() { return this.addproductForm.controls; }

  SelectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Media = file;

    }
  }
  //add product
  onSubmit() {
    this.submitted = true;
    // console.log(this.addproductForm.get('editor1').value)
     //console.log(this.addproductForm.value)
    //

    if (!this.addproductForm.get('Title').value ||
      !this.addproductForm.get('Status').value ||
      !this.addproductForm.get('Description').value ||
      !this.Media) {
      return;
    } else {
      this.productService.addProduct(
        this.addproductForm.get('Title').value,
        this.addproductForm.get('Status').value,
        this.addproductForm.get('Description').value,
        this.Media,
        
      ).subscribe(res => {
      

        this.toastr.success(`${res.message}`, 'Product', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
    



      })
    }

  }
 


}
