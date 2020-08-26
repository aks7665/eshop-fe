import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {}

  baseUrl = '/auth';

  userLogin = (data) => {
    const url = `${this.baseUrl}/login`;
    return this.apiService.postDataApi(data, url);
  }

  registerUser = (data) => {
    const url = `${this.baseUrl}/register`;
    return this.apiService.postDataApi(data, url);
  }
}
