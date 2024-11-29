import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductServiceService } from '../../../../product-service.service';
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(
    private product_service : ProductServiceService
  ){}

  parentCategories:any[] = environment.parentCategories
  token:string = localStorage.getItem("token") || ''
  parentCategory :any  


  create_category(category_name:string,s_descrip:string){
    this.product_service.create_category(category_name,s_descrip,this.parentCategory,this.token).subscribe((data:any)=>{
      if (data.code == 200) {
        alert("Tạo Danh mục Thành Công.")
      }
      else if(data.code == 504){
        alert(data.error)
      }
      else{
        console.log(data.error);
      }
    })
  }
}
