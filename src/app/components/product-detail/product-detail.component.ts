import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { ProductServiceService } from '../../product-service.service';
import { log } from 'console';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent, RouterOutlet,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
// 

constructor(
  private route:ActivatedRoute,
  private product_service : ProductServiceService
){}

productId:string = ''
product_slug :string = ''

product_infor:any
product_details:any[] =[]
product_imgs:any[] =[]
product_variants:any[] =[]
recent_reviews:any[] =[]
recent_images:any[] =[]


baseUrl: string = 'http://localhost:3000/public/images/'

ngOnInit(){
  // get data from param in URL
  this.route.paramMap.subscribe( (params:ParamMap)=>{
    this.product_slug = params.get("product_slug") || ''
    //console.log(this.product_slug);
  })
  // get data from query in URL
  this.route.queryParamMap.subscribe( param=>{
    this.productId = param.get("idProduct") || ''    
    this.product_service.detail_product(this.productId).subscribe( (data:any)=>{
      this.product_infor = data.data
      this.product_imgs = this.product_infor.product_imgs
      this.product_details = this.product_infor.product_details

    })
  })
}

formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear(); return `${day}-${month}-${year}`;
  return `${day}-${month}-${year}`;
}

// tăng giảm số lượng sản phẩm muốn mua
plusOrMinusQuantityProductOrder(isPlus: boolean): void {
  let currentQuantityProductOrder = document.getElementById('quantityOfProductOrderID') as HTMLInputElement;
  if(isPlus){
    (document.getElementById("quantityOfProductOrderID") as any).value = (currentQuantityProductOrder.value as any) - 0 + 1
    console.log(typeof(currentQuantityProductOrder.value))
  }else if((document.getElementById("quantityOfProductOrderID") as any).value != 1){
    (document.getElementById("quantityOfProductOrderID") as any).value = (currentQuantityProductOrder.value as any) - 0 - 1
    console.log(typeof(currentQuantityProductOrder.value))
  }
}
// đánh giá sao (1-5 sao) cho sản phẩm
starRatingForProduct(numberOfStars: string): void {
  let currentStarOfProduct = document.getElementById('starRatingOfProductID') as HTMLInputElement;
  let starRatingForm = document.getElementsByClassName('starRatingOfProduct')[0] as HTMLDivElement;
  if(numberOfStars != currentStarOfProduct.value){
    for(let i=1; i<=5; i++){
      if(i <= ((numberOfStars as any) - 0)){
        ((starRatingForm.childNodes[i]) as HTMLElement).className = "fa fa-star checked"
      }else{
        ((starRatingForm.childNodes[i]) as HTMLElement).className = "fa fa-star"
      }
    }
    (document.getElementById('starRatingOfProductID') as HTMLInputElement).value = numberOfStars
    console.log((document.getElementById('starRatingOfProductID') as HTMLInputElement).value)
  }else{
    for(let i=1; i<=5; i++){
      ((starRatingForm.childNodes[i]) as HTMLElement).className = "fa fa-star"
    }
    (document.getElementById('starRatingOfProductID') as HTMLInputElement).value = '0';
    console.log("Chưa đánh giá")
  }
}
// thay đổi hình chiếu sản phẩm khi hover vào hình nhỏ
changeImageActive(orderOfImage: string): void { 
  ((document.getElementById('imageOfProductActivedID') as HTMLDivElement).childNodes[0] as HTMLImageElement).src = (document.getElementById('imageOfProductID'+orderOfImage)?.childNodes[0] as HTMLImageElement).src;
  (document.getElementById('imageOfProductID1') as HTMLElement).className = 'imageOfProductDetail';
  (document.getElementById('imageOfProductID2') as HTMLElement).className = 'imageOfProductDetail';
  (document.getElementById('imageOfProductID3') as HTMLElement).className = 'imageOfProductDetail';
  (document.getElementById('imageOfProductID4') as HTMLElement).className = 'imageOfProductDetail';
  (document.getElementById('imageOfProductID5') as HTMLElement).className = 'imageOfProductDetail';
  (document.getElementById('imageOfProductID'+orderOfImage) as HTMLElement).className = 'imageOfProductDetail choosed';
}

}
