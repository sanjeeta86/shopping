import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-status',
  templateUrl: './manage-status.component.html',
  styleUrls: ['./manage-status.component.css']
})
export class ManageStatusComponent implements OnInit {
  productDetail: any;
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
   this.getstatus();
  }
  getstatus() {
    this.productService.getmanagestatus().subscribe(res => {
      console.log("status",res.openstatus)
      this.productDetail = res;

    })
  }

}
