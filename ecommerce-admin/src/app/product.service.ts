import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {


    apiServer = environment.apiServerProduct;
   
  constructor(private http: HttpClient,
    private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


 


  //add 
  addProduct(Title: string,
    Status: string,
    Description:string,
    Media: any,
   ): Observable<any> {
    let formData = new FormData();

    formData.append('Title', Title);
    formData.append('Status', Status);
    formData.append('Description', Description)
    formData.append('Media', Media)
   
    

    return this.http.post(`${this.apiServer}`, formData)
  }

  getProducts(): Observable<any> {
    console.log("gh",this.http.get(`${this.apiServer}`))
    return this.http.get(`${this.apiServer}`)
   
  }

  getmanagestatus():Observable<any> {
    console.log("gh",this.http.get(`${this.apiServer}/managestatus`))
    return this.http.get(`${this.apiServer}/managestatus`)
   
  }
    //get single product by id
    getSingleProductsById(id): Observable<any> {
      return this.http.get(`${this.apiServer}/${id}`)
    }
    updateProductswithSinglePhoto(id,Media: any): Observable<any> {

      let formData = new FormData();
      formData.append('Media', Media)
      // console.log(formData)
      return this.http.put(`${this.apiServer}/single/${id}`, formData)
    }
  

    //delete product
    deleteProducts(id): Observable<any> {
      return this.http.delete(`${this.apiServer}/${id}`)
    }
    updateProducts(id, product): Observable<any> {
     return this.http.put(`${this.apiServer}/update/${id}`, product)
    }
  
}

