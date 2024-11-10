import { Component } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../../../product-service.service';
import { UserServiceService } from '../../../../user-service.service';
import { RouterOutlet,Router } from '@angular/router';
@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent {
  constructor(
    private product_service : ProductServiceService,
    private user_service : UserServiceService,
    private route : ActivatedRoute,
    private router: Router
  ){}

// common Module, ngFor ngIf- service to connect api,ngOnInit intera value, activated,parramamap tp get params
  token:string = localStorage.getItem("token") || ''
  listCategory: any[] = []
  page:number = 1

  ngOnInit(){
    this.update_category(this.page)   
  }

  update_category(page:number){
    return this.user_service.getlistCategoryByToken(this.token,page).subscribe( (data:any)=>{
      this.listCategory = data.data.listCategory
    })  
  }

  delete_category(categoriesID:string){
    return this.user_service.delete_category(categoriesID,this.token).subscribe( (data:any)=>{
      if(data.code == 200){
        alert(data.data)
        this.update_category(this.page)
      }
      else console.log(data.error);
    })
  }

  goToPage(page:number){
    this.router.navigate([], { relativeTo: this.route, queryParams: { page: page }, queryParamsHandling: 'merge' });
    this.update_category(page)
  }

}
