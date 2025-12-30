import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  categories: string[] = ['Classic', 'Muscle', 'Antique', 'Sports'];
  postProduit(data: any) {
    return this.http.post<any>("http://localhost:3000/products", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getProduit(data: any) {
    return this.http.get<any>("http://localhost:3000/products")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getALLProduit() {
    return this.http.get<any>("http://localhost:3000/products").pipe(map(res => <any>res));
  }
  deleteProduit(id: number | string) {
    return this.http.delete<any>("http://localhost:3000/products/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  updateProduit(data: any, id: number | string) {
    return this.http.put<any>("http://localhost:3000/products/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}

