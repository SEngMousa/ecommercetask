import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/shared/models/product.model';
import { environment } from 'src/environments/environment';
@Injectable()
export class ProductService {
  private apiUrl = environment.API_URL + '/products';

  constructor(private http: HttpClient) {}

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  getProducts(limit: number): Observable<Product[]> {
    const params = new HttpParams().set('limit', limit.toString());

    return this.http.get<Product[]>(this.apiUrl, { params });
  }
  addProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }

  updateProduct(id: number, productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
