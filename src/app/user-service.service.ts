import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = 'http://localhost:3000/api/';

  constructor(
    private http : HttpClient
  ) { }

  // cau hinh Headers
  options = { headers : new HttpHeaders().set("Content-Type" , "application/json") }

  user_register(formData : FormData) : Observable<any>{
    const api = 'user/create'
    return this.http.post(this.url + api, formData) // post (api_name , data , option_headers)
  }

  user_login(user_email:any, user_password:any) : Observable<any>{
    const api = 'user/login'
    const body = {
      "user_email" : user_email,
      "user_password" : user_password
    }
    return this.http.post(this.url + api, body, this.options)
  }

  user_cart(token:string):Observable<any>{
    let api = 'user/cart'
    let header = new  HttpHeaders({
      'Authorization': "Bearer "  + token
    })
    const requestOptions = {headers :header}
    return this.http.post(this.url + api, '' , requestOptions)
  }

  update_cart(quantity:Number,product_id:string,variant_id:string,token:string):Observable<any>{
    let api = 'user/cart/update'
    let header = new  HttpHeaders({
      'Authorization': "Bearer "  + token
    })
    let objectData={
      quantity   :quantity,
      product_id :product_id,
      variant_id :variant_id
    }
    const requestOptions = {headers :header}
    return this.http.post(this.url + api, objectData, requestOptions)
  }

  shop_detail(Id_seller:string,page:Number,sortBy:string,category_id:string):Observable<any>{
    let api = `product/shop?page=${page}&sortBy=${sortBy}`
    const body = {
      category_id : category_id,
      Id_seller   : Id_seller
    }
    return this.http.post(this.url + api, body, this.options)
  }
  
  shop_manage(token:string,page:Number,sortBy:string,category_id:string):Observable<any>{
    let api = `product/manage?page=${page}&sortBy=${sortBy}`
    let header = new  HttpHeaders({
      'Authorization': "Bearer "  + token
    })
    const requestOptions = {headers :header}
    return this.http.post(this.url + api, {category_id}, requestOptions)
  }




  // for user
  getlistCategory(Id_seller:string):Observable<any>{
    const api = 'category/getlistCategory'
    return this.http.post(this.url + api, {Id_seller}, this.options)
  }
  getAllCategory():Observable<any>{
    const api = 'category/getAllCategory'
    return this.http.post(this.url + api, '', this.options)
  }
  // for seller
  getlistCategoryByToken(token:string,page:number):Observable<any>{
    const api = `category?page=${page}`
    const headers = new HttpHeaders({
      "Authorization" : "Bearer " + token
    })
    const requestOptions = { headers : headers}
    return this.http.post(this.url + api,'',requestOptions)
  }
  delete_category(categoriesID:string,token:string):Observable<any>{
    let api = 'category/delete'
    let header = new  HttpHeaders({
      'Authorization': "Bearer "  + token
    })
    const requestOptions = {headers :header}
    return this.http.post(this.url + api, {categoriesID}, requestOptions)
  }
}
