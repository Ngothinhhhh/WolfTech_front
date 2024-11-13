import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,map,Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private url = 'http://localhost:3000/api/';
  private datasubject = new Subject<any>()

  constructor(
    private http : HttpClient
  ) { }

  checkToken(token:any): Observable<any>{
    let api = 'checkToken'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "  + token
    });
    const requestOptions = { headers: headers };
  return this.http.get(this.url + api, requestOptions)
  }

  // phát dữ liệu
  sendData(data:{key:string,value:any}){
    this.datasubject.next(data) // Phát dữ liệu tới tất cả các observer đã đăng ký
  }
  getData(){
    return this.datasubject.asObservable()  // Trả về một Observable để các observer có thể đăng ký và nhận dữ liệu
  }
  // nhận dữ liệu 

}
