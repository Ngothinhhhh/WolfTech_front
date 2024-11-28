import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../../user-service.service';
import { ProductServiceService } from '../../../../product-service.service';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  constructor(
    private user_service    : UserServiceService,
    private product_service : ProductServiceService,
    private router : Router,
  ){}

  token:string = localStorage.getItem("token") || ''
  page :number = 1
  detail_order : any[] = [] 
  list_order : any[] = []
  product_details:any[] =[]
  // order_status : string = "Successfull"
  order_status : string = "Processing"


  Object_review_array : any[] = []
  review_boolean:boolean = false
  review_rating:string = ''
  review_context:string = ''
  file_array:any

  product_id:string = ''
  variant_id:string = ''
  order_id:string = ''
  length_order_detail : number = 0

  baseUrl: string = environment.baseUrl


  ngOnInit(){
    this.updateListOrder()
  }

  updateListOrder(){
    this.user_service.getList_order(this.token,this.page, this.order_status).subscribe((data:any)=>{
      if(data.code == 200 ){
        this.list_order = data.data
      }else{
        console.log(data.error);
      }
    })
  }
  
  create_review(product_id:string,variant_id:string,order_id:string,review_rating:string,review_context:string,file_array:any){
    const formData = new FormData()
    formData.append("product_id",product_id)
    formData.append("product_variants_id",variant_id)
    formData.append("order_id",order_id)
    formData.append("review_rating",review_rating.toString())
    formData.append("review_context", review_context) 
    if(file_array.length > 0){
      file_array.forEach( (file:any)=>{
        formData.append("review_image", file)
      })
    }
    this.user_service.create_review(formData,this.token).subscribe((data:any)=>{
      if(data.code == 200){
        // alert("Đánh giá hoàn tất")
        // this.router.navigate(["/profile-user/order-history"])
      } else{
        console.log(data.error);
      }
    })
  
  }

  open_review(product_id:string,variant_id:string,order_id:string,length:number){
    if (this.review_boolean == false) {
      this.product_id = product_id
      this.variant_id= variant_id
      this.order_id = order_id
      this.length_order_detail = length
    }
    this.review_boolean = !this.review_boolean 
  }

  onChangeImage(event:any) {
    this.file_array = Array.from(event.target.files) 
  }

  one_review(){
    this.review_context = (document.getElementById('reviewContextID') as HTMLTextAreaElement).value;
    this.review_rating = (document.getElementById('starRatingOfProductID') as HTMLTextAreaElement).value;  
    if (this.review_context != '' && this.review_rating != '' && this.product_id != ''&& this.variant_id != ''&& this.order_id != ''){
      if(this.file_array.length > 0 ){
        // this.create_review(this.product_id,this.variant_id,this.order_id,this.review_rating,this.review_context,this.file_array)
        const object = {
          product_id : this.product_id,
          variant_id : this.variant_id,
          order_id   : this.order_id,
          review_rating : this.review_rating,
          review_context : this.review_context,
          file_array : this.file_array
        }
        this.Object_review_array.push(object)
        this.review_boolean = !this.review_boolean
        console.log(this.Object_review_array);
        console.log(this.length_order_detail);
        if (this.length_order_detail == this.Object_review_array.length) {
          this.create_arr_review()
        }
      }else{
        alert("LOI")
      }
    }else{
      alert("Error")
    }
  }

  async create_arr_review(){
    for(const element of this.Object_review_array){
      await this.create_review(element.product_id,element.variant_id,element.order_id,element.review_rating,element.review_context,element.file_array)
    }
    // await this.Object_review_array.forEach(element => {
    //    this.create_review(element.product_id,element.variant_id,element.order_id,element.review_rating,element.review_context,element.file_array)
    // }) // not use because forEach không hoạt động với async await, thay vào đó dùng forOf 
    await alert("Đánh giá hoàn tất")
    await this.updateListOrder()
  }
  


  
}
