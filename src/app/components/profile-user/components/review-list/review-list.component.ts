import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../../user-service.service';
import { ProductServiceService } from '../../../../product-service.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environments';




@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
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
  order_status : string = "Successfull"
  // order_status : string = "Processing"


  baseUrl: string = environment.baseUrl


  ngOnInit(){
    this.user_service.getList_order(this.token,this.page, this.order_status).subscribe((data:any)=>{
      if(data.code == 200 ){
        this.list_order = data.data
        console.log(this.list_order);
        
      }else{
        console.log(data.error);
      }
    })
  }

}
