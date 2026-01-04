import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  categories: string[] = ['Classic', 'Muscle', 'Antique', 'Sports'];
  postProduit(data: any) {
    return this.http.post<any>(environment.apiUrl + "/products", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getProduit(data: any) {
    return this.http.get<any>(environment.apiUrl + "/products")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getALLProduit() {
    return this.http.get<any>(environment.apiUrl + "/products").pipe(map(res => <any>res));
  }
  deleteProduit(id: number | string) {
    return this.http.delete<any>(environment.apiUrl + "/products/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  updateProduit(data: any, id: number | string) {
    return this.http.put<any>(environment.apiUrl + "/products/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}

