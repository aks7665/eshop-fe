import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) {}

  baseUrl = '/products';

  fetchAllProducts = () => {
    const url = `${this.baseUrl}`;
    return this.apiService.getDataApi(url);
  }

  fetchProduct = (id) => {
    const url = `${this.baseUrl}/${id}`;
    return this.apiService.getDataApi(url);
  }

  createProduct = (data) => {
    const url = `${this.baseUrl}`;
    return this.apiService.postDataApi(data, url);
  }

  updateProduct = (id, data) => {
    const url = `${this.baseUrl}/${id}`;
    return this.apiService.patchDataApi(data, url);
  }

  deleteProduct = (id) => {
    const url = `${this.baseUrl}/${id}`;
    return this.apiService.deleteDataApi(url);
  }
}
