import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private url = 'http://localhost:3000/api/';

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

}
