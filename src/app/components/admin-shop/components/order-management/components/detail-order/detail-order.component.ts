import { Component } from '@angular/core';
import { UserServiceService } from '../../../../../../user-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.css'
})
export class DetailOrderComponent {

  constructor(
    private user_service : UserServiceService,
    private route : ActivatedRoute,
    private router : Router
  ){}
  
  token : string = localStorage.getItem("token") || ''
  orders_ID :string = ''
  detail_order : any

  ngOnInit(){
    this.orders_ID = this.route.snapshot.queryParamMap.get("orders_ID") || ''
    this.orders_ID = this.orders_ID.toString()
    console.log(this.orders_ID);
    this.update_data(this.orders_ID)
  }

  update_data(orders_ID :string){
    this.user_service.detailOrder_for_Admin(this.token, orders_ID).subscribe((data:any)=>{
      if (data.code == 200) {
        this.detail_order = data.data
        console.log(this.detail_order)
      } else {
        console.log(data.error)
      }
    })
  }

}
