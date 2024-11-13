import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppServiceService } from '../../app-service.service';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private app_service : AppServiceService
  ){}

  length_cart:any

  ngOnInit(){
    this.app_service.getData().subscribe((data:any)=>{
      if(data.key == "cart_length"){
        this.length_cart = data.value
        // console.log(this.length_cart);
      }
      // console.log(data);
    })

  }



  // open form search
  openFormSearchOnMobile(): void{
    
  }
}
