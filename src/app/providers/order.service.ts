import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) {}

  baseUrl = '/orders';

  fetchAllOrders = () => {
    const url = `${this.baseUrl}`;
    return this.apiService.getDataApi(url);
  }

  createOrder = (data) => {
    const url = `${this.baseUrl}`;
    return this.apiService.postDataApi(data, url);
  }
}
