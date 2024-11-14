import { Component,inject } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { AppServiceService } from '../../app-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  constructor(private http: HttpClient) { }

  createPayment() {
    const paymentData = {
      product : "san pham 1",
      amount: 2000000,  // Ví dụ số tiền
      bankCode: 'NCB',  // Ví dụ mã ngân hàng
      language: 'vn'
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://localhost:8888/order/create_payment_url', paymentData,{headers})
      .subscribe(response => {
        // Chuyển hướng người dùng tới URL thanh toán nhận được từ server
        window.location.href = response.redirectUrl;
      }, error => {
        console.error('Lỗi khi tạo URL thanh toán:', error);
      });
  }
}
