import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


import { UserServiceService } from '../../user-service.service';
import { ProductServiceService } from '../../product-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent, RouterOutlet,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(
    private user_service:UserServiceService,
    private product_service:ProductServiceService
  ){}

  token:any
  product_cart : any[] = [] 
  baseUrl: string = 'http://localhost:3000/public/images/'

  ngOnInit(){
    this.token = localStorage.getItem("token")
    this.user_service.user_cart(this.token).subscribe( data=>{
      if(data.code == 200){
        this.product_cart =  data.data[0].cart
        console.log(this.product_cart);
      }
      else console.log(data.error);  
    })
  }

  remove_cart(product:string,variant_id:string){
    return this.product_service.remove_cart(product,variant_id,this.token).subscribe( (data:any)=>{
      if(data.code == 200){
        window.location.reload();
        alert("Xóa thành công")
      } 
      else console.log(data.error);
    })
  }
  change_quality(quantity:any,product:any,variant_id:any){
    return this.user_service.update_cart(quantity.value,product,variant_id,this.token).subscribe((data:any)=>{
      if(data.code == 200) {
        alert("Update thành công")
        window.location.reload();
      } 
      console.log(data.error); 
    })
  }
}
