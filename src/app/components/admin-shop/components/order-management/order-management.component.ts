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
  // sortBy:string= ''
  // category_id:string= ''
  listOrder : any[] = []

  baseUrl: string = environment.baseUrl


  ngOnInit(){  
    // this.route.queryParamMap.subscribe( params =>{
    //   this.page = Number(params.get("page")) || 1
    //   this.sortBy = params.get("sortBy") || ''
    //   this.category_id = params.get("category_id") || ''
    //   this.update_data(this.page,this.sortBy,this.category_id)
    // })
    
  }
  update_data(page:number,order_status:string){
    this.user_service.getList_order(this.token,page,order_status).subscribe( (data:any)=>{
      if(data.code == 200){
        this.listOrder = data.data.listProduct
        // console.log(this.listProduct); 
      }
      else{
        console.log(data.error);
      }
    })
  }
  goToPage(page:number){
    this.currentPage = page; // Cập nhật trang hiện tại
    this.router.navigate([], { relativeTo: this.route, queryParams: { page: page }, queryParamsHandling: 'merge' });
    // this.update_data(page,this.sortBy,this.category_id)
  }
  isActive(page: number): boolean { return this.currentPage === page; }

}
