import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet ,Router} from '@angular/router';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { UserServiceService } from '../../user-service.service';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent {

  constructor(
    private route:ActivatedRoute,
    private user_service:UserServiceService,
    private router: Router
  ){}

  shop_name:string = ''
  idSeller:string = ''
  page:number = 1
  sortBy:string =''
  category_id:string = ''
  listProduct :any[] = []
  listCategory :any[] = []
  dataUser :any
  url:string = ''

  baseUrl: string = 'http://localhost:3000/public/images/'


  ngOnInit(){
    // get param in url by "shop_name"
    // this.route.paramMap.subscribe( (params:ParamMap)=>{
    //   this.shop_name = params.get("shop_name") || ''
    // })
    this.route.queryParamMap.subscribe( params =>{
      this.idSeller = params.get("idSeller") || ''
      this.page = Number(params.get("page")) || 1
      this.sortBy = params.get("sortBy") || 'product_avg_rating'
      this.category_id = params.get("category_id") || ''
      this.user_service.shop_detail(this.idSeller,this.page,this.sortBy,this.category_id).subscribe( (data:any)=>{
        if(data.code == 200){
          this.dataUser = data.data.dataUser
          this.listProduct = data.data.listProduct
          // console.log(this.listProduct); 
          // console.log(this.dataUser);
        }
        else{
          console.log(data.error);
        }
      })
    })

    this.user_service.getlistCategory(this.idSeller).subscribe( (data:any)=>{
      if(data.code == 200 ){
        this.listCategory = data.data
      } 
      else console.log(data.error);
      
    }) 
    // get data is hidden in url by "idSeller"
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear(); return `${day}-${month}-${year}`;
    return `${day}-${month}-${year}`;
  }
  // Xử lý chuyển tab trong trang Shop
  handleClickTabShopPage(id: string) {
    if(id === "btnHomeID"){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      (document.getElementById(id) as HTMLElement).classList.add("checked");
      (document.getElementById('btnAllProductID') as HTMLElement).classList.remove("checked");
    }else{
      (document.getElementById('topOfproductListMainID') as HTMLElement).scrollIntoView();
      (document.getElementById(id) as HTMLElement).classList.add("checked");
      (document.getElementById('btnHomeID') as HTMLElement).classList.remove("checked");
    }
  }

  productByCondition(page:number,sortBy:string,categoryId:string){
    return this.user_service.shop_detail(this.idSeller,page,sortBy,categoryId).subscribe( (data:any)=>{
      if(data.code == 200 ){
        this.listProduct = data.data.listProduct
        console.log(this.listProduct);
      }
      else console.log(data.error);
    })
  }
  updatePage(page:number){
    this.page = page
    this.router.navigate([], { relativeTo: this.route, queryParams: { page: this.page }, queryParamsHandling: 'merge' });
    console.log(page);
    console.log(this.sortBy);
    console.log(this.category_id);
    this.productByCondition(this.page, this.sortBy, this.category_id);
    console.log(page);
  }
}
