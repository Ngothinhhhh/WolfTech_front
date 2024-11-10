import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  // Mở Bộ lọc sản phẩm 
  openFilterProductList(): void{
    (document.getElementById('leftOfProductListID') as HTMLDivElement).style.transform = 'translateX(0px)';
  }
  // Đóng Bộ lọc sản phẩm 
  closeFilterProductList(): void{
    (document.getElementById('leftOfProductListID') as HTMLDivElement).style.transform = 'translateX(-500px)';
  }
}
