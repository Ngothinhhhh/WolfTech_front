import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { environment } from '../../../../../environments/environments';
import { UserServiceService } from '../../../../user-service.service';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent {

  constructor(
    private user_service:UserServiceService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  token:string = localStorage.getItem("token") || ''
  page:number = 1
  currentPage: number = 1; // Khởi tạo trang hiện tại là trang đầu tiên
  sortBy:string= ''
  order_status:string= ''
  listOrder : any[] = []

  baseUrl: string = environment.baseUrl


  ngOnInit(){  
    this.update_data(this.page , this.sortBy,this.order_status,)
  }

  update_data(page:number,sortBy:string,order_status:string){
    this.user_service.getListOrder_for_Admin(this.token,page,sortBy,order_status).subscribe((data:any)=>{
      if (data.code == 200) {
        this.listOrder = data.data
        console.log(data.data);
      } else {
        console.log(data.error);
      }
    })
  }

  goToPage(page:number){
    this.currentPage = page; // Cập nhật trang hiện tại
    this.router.navigate([], { relativeTo: this.route, queryParams: { page: page , sortBy : this.sortBy , status : this.order_status }, queryParamsHandling: 'merge' });
    this.update_data(page , this.sortBy , this.order_status)
  }

  filter_status(status:string){
    this.page = 1
    this.order_status = status
    this.update_data(this.page, this.sortBy, status)
  }
  
  isActive(page: number): boolean { return this.currentPage === page; }

}
